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
import { useNavigate } from 'react-router-dom';


function getDefaultContainerData(type: Container['type']): Container {
    const id = randomId();

    switch (type) {
        case 'qa': {
            return {
                id,
                type,
                question: '',
                answer: '',
            };
        }
        case 'description': {
            return {
                id,
                type,
                description: '',
            }
        }
    }
}

function CreateTraining() {
    const [containers, setContainers] = useState<Array<Container>>([]);
    const navigate = useNavigate();

    let user: any = {};
    user = useUserAuth().user;

    const { createTrainingCourse, userData } = useFirebase();


    React.useEffect(() => {
        if (parseInt(userData?.role!) !== 2) {
            navigate("/dashboard");
        }
    })


    function addContainerFunc(type: Container['type']): React.MouseEventHandler {
        return (e) => {
            e.preventDefault();

            const container = getDefaultContainerData(type);
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
            return <Description {...props} current={container as DescriptionContainer} />
        }
    }).map(element => <div className='col-12'>{element}</div>)

    const [title, setTitle] = useState("");
    async function saveTrainingData() {
        // training_course:{
        //  author:
        //  createdAt:
        //  title:
        //  parts:[
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
            author: user.email,
            title: title,
        });
        toast.info("Training course has been saved!");
        try {
            setTimeout(() => navigate("/dashboard"), 3000);
        } catch {

        }
    }

    return (
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
                        <div className="d-inline-flex flex-column m-3 p-3 bg-success bg-opacity-10 mx-auto">
                            <div className="">
                                <h2>Training course title:</h2>
                            </div>
                            <div className="m-2 vw-auto">
                                <input type="text" className="form-control" aria-label='title' onChange={(e) => setTitle(e.target.value)}></input>
                            </div>

                        </div>
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
    )
}

export default CreateTraining;