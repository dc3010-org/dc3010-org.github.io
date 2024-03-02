import { Timestamp } from "firebase/firestore";



interface BaseQuestionAnswerContainer {
    type: 'qa';
    question: string;
    answer: string;
}

interface BaseDescriptionContainer {
    type: 'description';
    description: string;
}
interface BaseContainer {
    id: string,
}


export interface QuestionAnswerContainer extends BaseQuestionAnswerContainer, BaseContainer { }
export interface DescriptionContainer extends BaseDescriptionContainer, BaseContainer { }


export type Container = QuestionAnswerContainer | DescriptionContainer;

export interface TrainingCourse {
    // TODO: probably put this somewhere else
    id: string,
    title: string,
    author: string,
    parts: Container[];
    createdAt: Timestamp;
}