import { useFirebase } from "./FirebaseProvider";
import ViewTrainingContainer from "./components/ViewTrainingContainer";
import { useLocation } from "react-router-dom";
import { Container, TrainingCourse } from "./data/TrainingCourse";
import { useState } from "react";
import React from "react";

type AmendedTrainingCourse = Omit<TrainingCourse, 'parts'> & {
    parts: Array<{
        container: Container,
        correct: boolean,
    }>
};

function ViewTraining() {
    let { getCourseById } = useFirebase();
    let location = useLocation();

    const [trainingCourse, setTrainingCourse] = useState<AmendedTrainingCourse>();


    React.useEffect(() => {
        if (trainingCourse) return;

        if (getCourseById(location.state.search) !== null) {
            const course = getCourseById(location.state.search);

            if (!course) return;

            setTrainingCourse({
                ...course,
                parts: course.parts.map(part => ({
                    container: part,
                    correct: false
                }))
            });
        }
    })

    function setCorrect(index: number) {
        if (!trainingCourse) return;

        const parts = [...trainingCourse.parts];
        parts[index] = {
            ...parts[index],
            correct: true,
        };
        setTrainingCourse({
            ...trainingCourse,
            parts,
        })
    }

    let renderedContainers;
    if (trainingCourse) {
        renderedContainers = trainingCourse.parts.map((part, index) =>
            <ViewTrainingContainer
                key={index}
                part={part.container}
                isCorrect={part.correct}
                setCorrect={() => setCorrect(index)} />
        );
    } else {
        renderedContainers = <p>No training course has been found with that ID. Please return to the dashboard.</p>
    }

    return (
        <div className="col-lg-10 col-12">
            <div className="d-flex flex-row">
                <h1>{trainingCourse?.title}</h1>
            </div>
            <div>
                <div className="d-flex justify-content-center flex-column">
                    <div className="row">
                        {renderedContainers}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTraining;