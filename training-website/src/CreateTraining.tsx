import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import QuestionAnswer from './components/QuestionAnswer';
import Description from './components/Description';
import { v4 as randomId, } from 'uuid';

interface Container {
    id: string,
    type: 'qa' | 'description';
}

interface QuestionAnswerContainer extends Container {
    type: 'qa';
}

interface DescriptionContainer extends Container {
    type: 'description';
}



function CreateTraining() {
    const [containers, setContainers] = useState<Array<Container>>([]);

    function addContainerFunc(type: 'qa' | 'description'): React.MouseEventHandler {
        return (e) => {
            e.preventDefault();

            let container = {
                id: randomId(),
                type,
            };


            setContainers([...containers, container]);
        };
    }

    const renderedContainers = containers.map(container => {
        const props = {
            key: container.id,
            onDelete: () => setContainers(containers.filter(e => e.id !== container.id)),
        }
        if (container.type === 'qa') {
            return <QuestionAnswer {...props} />
        } else {
            return <Description {...props} />
        }
    }).map(element => <div className='col-2'>{element}</div>)

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <header className="d-flex justify-content-center flex-column">
                            <h1>Create a training course</h1>
                            <h2 className="fs-4 fw-light ps-2">Press either button below to get started!</h2>
                        </header>
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
        </div>
    )
}

export default CreateTraining;