import { useState } from "react";
import { LoadingState, User, useFirebase } from "../FirebaseProvider";
import { TrainingCourse } from "../data/TrainingCourse";
import React from "react";

function TrainingContainer({ course }: { course: TrainingCourse }) {
    let { userData, updateUserTrainingCourses } = useFirebase();

    let enrollElement;
    if (userData?.trainingCourseIds !== undefined && userData?.trainingCourseIds.includes(course.id)) {
        enrollElement = <button
            type="button"
            className="btn btn-secondary btn-lg"
            aria-label='disabled-enroll-button'
            disabled>
            Already enrolled!
        </button>
    } else {
        enrollElement = <button
            type="button"
            className="btn btn-success btn-lg"
            aria-label='enroll-button'
            onClick={handleEnroll}>
            Enroll!
        </button>
    }

    function handleEnroll(): void {
        if (!userData) {
            throw new Error('User data not yet loaded!');
        }
        if (!userData.email) return;

        updateUserTrainingCourses(userData.uid, course.id)
    }

    return (
        <div className="border border-dark rounded px-3 d-flex my-3 mw-100">
            <img className="w-25 border border-muted my-3"
                src="/images/OnlineLearning.jpg" alt="Online Learning" />
            <div className="flex-grow-1 m-3 w-75">
                <h2 className="text-overflow">
                    {course.title}
                </h2>
                <p className="text-muted">
                    {course.id}
                </p>
                <h2>
                    --------
                </h2>
                <h2 className="text-muted">
                    Completion status:
                </h2>
                <div>
                    {enrollElement}
                </div>
            </div>
        </div>
    )
}

export default TrainingContainer;
