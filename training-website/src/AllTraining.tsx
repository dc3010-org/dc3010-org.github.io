import { useState } from "react";
import { LoadingState, useFirebase } from "./FirebaseProvider";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TrainingContainer from "./components/TrainingContainer";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TrainingCourse } from "./data/TrainingCourse";
import React from "react";

function AllTraining() {
    let { loadingState, trainingCourses, getCoursesByTitle } = useFirebase();

    const [searchTerm, setSearchTerm] = useState("");
    const [trainingContainerValues, setTrainingContainerValues] = useState<Array<TrainingCourse>>([]);


    React.useEffect(() => {
        setSearchTerm('');
        setTrainingContainerValues(trainingCourses);
    }, [loadingState]);

    if (loadingState === LoadingState.Loading) {
        return <p>Loading...</p>
    } else if (loadingState === LoadingState.Error) {
        return <p>Whoops! *Something* went wrong!</p>
    }

    let renderedCourses = trainingContainerValues.map(course => <TrainingContainer course={course} />);

    function searchByTitle() {
        let newCourses;
        if (!searchTerm.trim().length) {
            newCourses = trainingCourses;
        } else {
            newCourses = getCoursesByTitle(searchTerm);
        }

        setTrainingContainerValues(newCourses);
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
                        <header className="d-flex justify-content-center flex-column">
                            <h1>Available Training Courses:</h1>
                            <div className="border border-primary-subtle rounded px-3 d-flex my-3">
                                <div className="input-group m-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Excel tools, Word etc.'
                                        aria-label='search-term'
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && searchByTitle()} />
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        aria-label='search-training-course'
                                        onClick={searchByTitle}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search for training course
                                    </button>
                                </div>
                            </div>
                        </header>
                        <div>
                            <div>
                                <div className="d-flex justify-content-around flex-wrap m-3">
                                    {renderedCourses}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTraining;