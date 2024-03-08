import React, { createContext, useContext } from 'react';
import { database as db } from './firebase';
import { addDoc, arrayUnion, collection, doc, getDocs, limit, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { TrainingCourse } from './data/TrainingCourse';
import { useUserAuth } from './UserAuthContext';

// define class for user for transferring user data from database to application
export interface User {
    uid: string;
    email: string | null;
    role: string | null;
    trainingCourseIds: string[];
}

// define functions for use with firebase context in application, defining arguments and return types
interface FirebaseContextType {
    trainingCourses: TrainingCourse[];
    loadingState: LoadingState,
    createTrainingCourse: (newTrainingCourse: Omit<TrainingCourse, 'id' | 'createdAt'>) => Promise<string>;
    getCoursesByTitle: (title: string) => Array<TrainingCourse>;
    getCoursesByAuthor: (user: string) => Array<TrainingCourse>;
    getCourseById: (trainingCourseId: string) => TrainingCourse | undefined;
    createUser: (newuser: Omit<User, 'uid'>) => Promise<string>;
    userData: User | undefined;
    updateUserTrainingCourses: (userId: string, trainingCourseId: string) => Promise<void>;
    updateUserTrainingCoursesByEmail: (email: string, trainingCourseId: string) => Promise<void>;
}


const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = (): FirebaseContextType => {
    const context = useContext(FirebaseContext);
    return context!;
};

export enum LoadingState {
    Success,
    Loading,
    PendingLogin,
    Error,
}

export class UserNotFoundError extends Error {
    constructor() {
        super(`User could not be found with the criteria`);
    }
}


export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [loadingState, setLoadingState] = React.useState(LoadingState.Loading);
    const [trainingCourses, setTrainingCourses] = React.useState<TrainingCourse[]>([]);
    const [userData, setUserData] = React.useState<User>();

    const authedUser = useUserAuth().user;


    const fetchTrainingCourses = async () => {
        const trainingCourseRef = collection(db, 'training-courses');
        // get documents
        const snapshot = await getDocs(
            query(trainingCourseRef)
        );

        const trainingCourseData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setTrainingCourses(trainingCourseData as unknown as TrainingCourse[]);
    };
    const createTrainingCourse = async (trainingCourse: Omit<TrainingCourse, 'id' | 'createdAt'>) => {
        const trainingCourseRef = collection(db, 'training-courses');

        // add new document
        const output = await addDoc(trainingCourseRef, {
            ...trainingCourse,
            createdAt: serverTimestamp()
        });

        setLoadingState(LoadingState.Loading);
        return output.id;
    };

    const getCoursesByTitle = (title: string) => {
        return trainingCourses.filter(course => course.title.includes(title));
    };

    const getCoursesByAuthor = (user: string) => {
        return trainingCourses.filter(course => course.author.includes(user));
    }

    const getCourseById = (trainingCourseId: string) => {
        return trainingCourses.filter(course => course.id.includes(trainingCourseId)).at(0);
    }

    const createUser = async (user: Omit<User, 'uid'>) => {
        const userRef = collection(db, 'users');
        const output = await addDoc(userRef, user);

        setLoadingState(LoadingState.Loading);
        return output.id;
    };

    const fetchCurrentUser = async () => {
        setUserData(await fetchUserByEmail(authedUser.email));
    }

    const fetchUserByEmail = async (email: string) => {
        const userRef = collection(db, 'users');
        const user = await getDocs(query(
            userRef,
            where("email", "==", email),
            limit(1),
        ));

        if (user.docs.length === 0) {
            throw new UserNotFoundError();
        }

        const document = user.docs[0];
        const userData = {
            uid: document.id,
            ...document.data()
        } as User;

        return userData;
    };

    const updateUserTrainingCourses = async (userId: string, trainingCourseId: string) => {
        const document = doc(db, 'users', userId);
        // update document
        const output = await updateDoc(document, {
            trainingCourseIds: arrayUnion(trainingCourseId)
        });
        setUserData({
            ...userData!,
            trainingCourseIds: [...userData?.trainingCourseIds!, trainingCourseId]
        })
    }

    const updateUserTrainingCoursesByEmail = async (email: string, trainingCourseId: string) => {
        const userData = await fetchUserByEmail(email);
        const userDoc = doc(db, 'users', userData.uid);

        const output = await updateDoc(userDoc, {
            trainingCourseIds: arrayUnion(trainingCourseId)
        });
        return output;
    }

    React.useEffect(() => {
        // check if application is awaiting login from a user
        if (![LoadingState.PendingLogin, LoadingState.Loading].includes(loadingState) || authedUser === null) {
            if (authedUser === null) {
                setLoadingState(LoadingState.PendingLogin);
            }
            return;
        }

        fetchCurrentUser();
        fetchTrainingCourses().then(() => {
            setLoadingState(LoadingState.Success);
        });
        // monitor changes to states loadingState and authedUser, if chaned, these functions within the useEffect will run again
    }, [loadingState, authedUser]);

    // if a user is awaiting login, display a loading element
    if (![LoadingState.Success, LoadingState.PendingLogin].includes(loadingState) || (loadingState === LoadingState.PendingLogin && authedUser !== null)) {
        return (<p>Loading</p>)
    }

    // pass props of functions and variables defined here for application to use
    return <FirebaseContext.Provider value={{
        loadingState,
        trainingCourses,
        createTrainingCourse,
        getCoursesByTitle,
        getCoursesByAuthor,
        getCourseById,
        createUser,
        userData,
        updateUserTrainingCourses,
        updateUserTrainingCoursesByEmail,
    }}>
        {children}
    </FirebaseContext.Provider>

};