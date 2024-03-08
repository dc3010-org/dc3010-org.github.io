import { Timestamp } from "firebase/firestore";

//define class for QA block
interface BaseQuestionAnswerContainer {
    type: 'qa';
    question: string;
    answer: string;
}

//define class for Description block
interface BaseDescriptionContainer {
    type: 'description';
    description: string;
}

//define an id for each container
interface BaseContainer {
    id: string,
}

//export containers for QA and D with base container so both can be used when viewing actual training
export interface QuestionAnswerContainer extends BaseQuestionAnswerContainer, BaseContainer { }
export interface DescriptionContainer extends BaseDescriptionContainer, BaseContainer { }

// enum type giving options for either container
export type Container = QuestionAnswerContainer | DescriptionContainer;

// data type for training course for transferring training course data from database to application
export interface TrainingCourse {
    id: string,
    title: string,
    author: string,
    parts: Container[];
    createdAt: Timestamp;
}