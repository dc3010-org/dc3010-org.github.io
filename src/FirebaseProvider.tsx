import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database as db } from './firebase';
import { DocumentData, QueryDocumentSnapshot, addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, limit, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { TrainingCourse } from './data/TrainingCourse';
import { useUserAuth } from './UserAuthContext';

export interface User {
    uid: string;
    email: string | null;
    role: string | null;
    trainingCourseIds: string[];
}

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
}


const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = (): FirebaseContextType => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export enum LoadingState {
    Success,
    Loading,
    PendingLogin,
    Error,
}


export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [loadingState, setLoadingState] = React.useState(LoadingState.Loading);
    const [trainingCourses, setTrainingCourses] = React.useState<TrainingCourse[]>([]);
    const [userData, setUserData] = React.useState<User>();

    const authedUser = useUserAuth().user;


    const fetchTrainingCourses = async () => {
        const trainingCourseRef = collection(db, 'training-courses');
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

        // how to update a doc:
        // const document = doc(db, 'training-courses', output.id);
        // const output2 = await updateDoc(document, trainingCourse);

        setLoadingState(LoadingState.Loading);
        return output.id;
    };
    console.log(trainingCourses)

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
        const userRef = collection(db, 'users');
        const user = await getDocs(query(
            userRef,
            where("email", "==", authedUser.email),
            limit(1),
        ));

        if (user.docs.length === 0) {
            throw new Error('No user document registered for authed user');
        }

        const document = user.docs[0];
        const userData = {
            uid: document.id,
            ...document.data()
        } as User;

        setUserData(userData)
    };

    const updateUserTrainingCourses = async (userId: string, trainingCourseId: string) => {
        const document = doc(db, 'users', userId);
        const output = await updateDoc(document, {
            trainingCourseIds: arrayUnion(trainingCourseId)
        });
        setUserData({
            ...userData!,
            trainingCourseIds: [...userData?.trainingCourseIds!, trainingCourseId]
        })
    }

    //userById(userId: string) => User (lim 1, to assign training to user)

    React.useEffect(() => {
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
    }, [loadingState, authedUser]);

    if (![LoadingState.Success, LoadingState.PendingLogin].includes(loadingState) || (loadingState === LoadingState.PendingLogin && authedUser !== null)) {
        return (<p>Loading</p>)
    }

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
    }}>
        {children}
    </FirebaseContext.Provider>

};