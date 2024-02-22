import { Timestamp } from "firebase/firestore";



export interface Container {
    id: string,
    type: 'qa' | 'description';
}
export interface QuestionAnswerContainer extends Container {
    type: 'qa';
    question: string;
    answer: string;
}

export interface DescriptionContainer extends Container {
    type: 'description';
    description: string;
}

export interface TrainingCourse {
    // TODO: probably put this somewhere else
    id: string,
    title: string,
    author: string,
    parts: Container[];
    createdAt: Timestamp;
}