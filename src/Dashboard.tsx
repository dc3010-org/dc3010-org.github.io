import React, { useState } from "react";
import { useFirebase } from "./FirebaseProvider";
import { TrainingCourse } from "./data/TrainingCourse";
import TrainingContainer from "./components/TrainingContainer";

function Dashboard() {
    let { loadingState, getCourseById, userData } = useFirebase();
    const [trainingContainerValues, setTrainingContainerValues] = useState<Array<TrainingCourse>>([]);

    React.useEffect(() => {
        let currentCourses = Array<TrainingCourse>();
        if (userData?.trainingCourseIds) {
            for (let trainingCourseId of userData?.trainingCourseIds!) {
                currentCourses.push(getCourseById(trainingCourseId!)!)
            }
            setTrainingContainerValues(currentCourses);
        }
    }, [loadingState]);

    let renderedCourses = trainingContainerValues.map(course => <TrainingContainer course={course} page={"dashboard"} />);

    return (
        <div className="col-lg-10 col-12">
            <header className="d-flex justify-content-around flex-wrap">
                <h1 aria-label="current-training-label">Training courses you are currently enrolled on:</h1>
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

export default Dashboard;