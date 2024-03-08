import { useState } from "react";
import { LoadingState, useFirebase } from "./FirebaseProvider";
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
        // comment to disable eslint check on state vale being updated in useEffect Hook
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingState]);

    if (loadingState === LoadingState.Loading) {
        return <p>Loading...</p>
    } else if (loadingState === LoadingState.Error) {
        return <p>Whoops! *Something* went wrong!</p>
    }

    let renderedCourses;
    if (trainingContainerValues) {
        renderedCourses = trainingContainerValues.map(course => <TrainingContainer course={course} page={"all-training"} />);
    } else {
        renderedCourses = "No courses on the database."
    }
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
        <div className="col-lg-10 col-12">
            <header className="d-flex justify-content-center flex-column">
                <h1 aria-label="alltraining-label">Available Training Courses:</h1>
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} aria-label="font-awesome-search" /> Search for training course
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
    )
}

export default AllTraining;