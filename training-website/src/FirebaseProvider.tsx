import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database as db } from './firebase';
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { TrainingCourse } from './data/TrainingCourse';


interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    role: string | null;
    trainingCourseIds: string[];
}

interface FirebaseContextType {
    trainingCourses: TrainingCourse[];
    loadingState: LoadingState,
    createTrainingCourse: (newTrainingCourse: Omit<TrainingCourse, 'id'>) => Promise<string>;
    getCoursesByTitle: (title: string) => Array<TrainingCourse>;
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

    React.useEffect(() => {
        if (loadingState !== LoadingState.Loading) {
            return;
        }

        fetchTrainingCourses().then(() => {
            setLoadingState(LoadingState.Success);
        });
    }, [loadingState]);


    return <FirebaseContext.Provider value={{
        loadingState,
        trainingCourses,
        createTrainingCourse,
        getCoursesByTitle,
    }}>
        {children}
    </FirebaseContext.Provider>

};