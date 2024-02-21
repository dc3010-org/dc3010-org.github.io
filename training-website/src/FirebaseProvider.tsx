import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database as db } from './firebase';
import { DocumentData, QueryDocumentSnapshot, addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { TrainingCourse } from './data/TrainingCourse';
import { getAuth } from 'firebase/auth';


export interface User {
    uid: string;
    email: string | null;
    role: string | null;
    trainingCourseIds: string[];
}

interface FirebaseContextType {
    trainingCourses: TrainingCourse[];
    loadingState: LoadingState,
    createTrainingCourse: (newTrainingCourse: Omit<TrainingCourse, 'id'>) => Promise<string>;
    getCoursesByTitle: (title: string) => Array<TrainingCourse>;
    getCoursesByAuthor: (user: string) => Array<TrainingCourse>;
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
    Error,
}


export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [loadingState, setLoadingState] = React.useState(LoadingState.Loading);
    const [trainingCourses, setTrainingCourses] = React.useState<TrainingCourse[]>([]);
    const [userData, setUserData] = React.useState<User>();


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
    const createTrainingCourse = async (trainingCourse: Omit<TrainingCourse, 'id'>) => {
        const trainingCourseRef = collection(db, 'training-courses');

        // add new document
        const output = await addDoc(trainingCourseRef, trainingCourse);

        // how to update a doc:
        // const document = doc(db, 'training-courses', output.id);
        // const output2 = await updateDoc(document, trainingCourse);

        setLoadingState(LoadingState.Loading);
        return output.id;
    };


    const getCoursesByTitle = (title: string) => {
        return trainingCourses.filter(course => course.title.includes(title));
    };

    const getCoursesByAuthor = (user: string) => {
        return trainingCourses.filter(course => course.author.includes(user));
    }

    const createUser = async (user: Omit<User, 'uid'>) => {
        const userRef = collection(db, 'users');
        const output = await addDoc(userRef, user);

        setLoadingState(LoadingState.Loading);
        return output.id;
    };

    const getUserByEmail = async () => {
        const userRef = collection(db, 'users');
        const user = await getDocs(
            query(userRef, where("email", "==", getAuth().currentUser != null ? getAuth().currentUser?.email : "no user")
            ));

        setUserData(user as unknown as User)
    };

    const updateUserTrainingCourses = async (userId: string, trainingCourseId: string) => {
        const document = doc(db, 'users', userId);
        const output = await updateDoc(document, {
            trainingCourseIds: arrayUnion(trainingCourseId)
        });
    }

    React.useEffect(() => {
        if (loadingState !== LoadingState.Loading) {
            return;
        }
        getUserByEmail();
        fetchTrainingCourses().then(() => {
            setLoadingState(LoadingState.Success);
        });
    }, [loadingState]);


    return <FirebaseContext.Provider value={{
        loadingState,
        trainingCourses,
        createTrainingCourse,
        getCoursesByTitle,
        getCoursesByAuthor,
        createUser,
        userData,
        updateUserTrainingCourses,
    }}>
        {children}
    </FirebaseContext.Provider>

};