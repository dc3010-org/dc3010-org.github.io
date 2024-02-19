import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import QuestionAnswer from './components/QuestionAnswer';
import Description from './components/Description';
import { v4 as randomId, } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import { doc, setDoc } from "firebase/firestore";
import { useUserAuth } from './UserAuthContext';
import { getAllByLabelText } from '@testing-library/react';
import { Container, DescriptionContainer, QuestionAnswerContainer } from './data/TrainingCourse';
import { useFirebase } from './FirebaseProvider';


function CreateTraining() {
    const [containers, setContainers] = useState<Array<Container>>([]);

    const { createTrainingCourse } = useFirebase();


    function addContainerFunc(type: 'qa' | 'description'): React.MouseEventHandler {
        return (e) => {
            e.preventDefault();

            let container: Container = {
                id: randomId(),
                type,
            };

            if (type === 'qa') {
                const qa = container as QuestionAnswerContainer;
                qa.question = '';
                qa.answer = '';
            }


            setContainers([...containers, container]);
        };
    }

    const renderedContainers = containers.map((container, index) => {
        const props = {
            key: container.id,
            onDelete: () => setContainers(containers.filter(e => e.id !== container.id)),
            onChange: (newValue: Container) => {
                const newContainers = [...containers];
                newContainers[index] = newValue;
                setContainers(newContainers);
            },
        }

        if (container.type === 'qa') {
            return <QuestionAnswer {...props} current={container as QuestionAnswerContainer} />
        } else {
            return <Description {...props} />
        }
    }).map(element => <div className='col-12'>{element}</div>)

    let user: any = {};
    user = useUserAuth().user;
    async function saveTrainingData() {
        // training_course:{
        //  author:
        //  data:[
        //         {
        //             question:
        //             answer:
        //         },
        //         {
        //             description:
        //         }
        //     ]
        // }

        await createTrainingCourse({
            parts: containers,
            title: 'Testing 1 2 3'
        });
        toast.info("Training course has been saved!");
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <div className="d-flex flex-row">
                            <div className="flex-grow-1 flex-column">
                                <h1>Create a training course</h1>
                                <h2 className="fs-4 fw-light ps-2">Press either button below to get started!</h2>
                            </div>
                            <div className="p-2">
                                <button type="button" className="btn btn-primary btn-lg" aria-label='save-training-course' onClick={saveTrainingData}><FontAwesomeIcon icon={faFloppyDisk} /> Save training course</button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-center flex-column">
                                <div className="row">
                                    {renderedContainers}
                                </div>
                                <div className="border border-secondary-subtle border-3 border-style-dashed rounded px-3 d-flex my-3 mx-auto">
                                    <div className="p-4">
                                        <button type="button" className="btn btn-outline-secondary btn-lg" aria-label='add-question-and-answer' onClick={addContainerFunc('qa')}><FontAwesomeIcon icon={faPlus} /> Add Question & Answer block</button>
                                    </div>
                                    <div className="p-4">
                                        <button type="button" className="btn btn-outline-secondary btn-lg" aria-label='add-description' onClick={addContainerFunc('description')}><FontAwesomeIcon icon={faPlus} /> Add Description block</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateTraining;