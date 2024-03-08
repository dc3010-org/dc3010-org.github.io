import { useState } from "react";
import { UserNotFoundError, useFirebase } from "../FirebaseProvider";
import { TrainingCourse } from "../data/TrainingCourse";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TrainingContainer({ course, page }: { course: TrainingCourse, page: string }) {
    let { userData, updateUserTrainingCourses, updateUserTrainingCoursesByEmail } = useFirebase();
    const [assignedEmail, setAssignedEmail] = useState("");
    const navigate = useNavigate();

    let enrollElement;
    let assignElement;

    if (page === "dashboard") {
        enrollElement = <button
            type="button"
            className="btn btn-primary btn-lg"
            aria-label='view-training-button'
            onClick={handleViewtraining}>
            View Training
        </button>
    }
    else if (userData?.trainingCourseIds !== undefined && userData?.trainingCourseIds.includes(course.id)) {
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

    if (userData && parseInt(userData.role!) === 2) {
        assignElement = <div className="dropdown">
            <button type="button" className="btn btn-secondary btn-lg dropdown-toggle ms-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <FontAwesomeIcon icon={faPaperPlane} /> Assign to
            </button>
            <form className="dropdown-menu p-4" style={{ width: '300%' }}>
                <div className="input-group">
                    <input type="email" className="form-control" id="assign-email-input" placeholder="email@example.com" onChange={(e) => setAssignedEmail(e.target.value)}></input>
                    <button
                        type="button"
                        className="btn btn-primary"
                        aria-label='assign-button'
                        onClick={handleAssign}>Assign</button>
                </div>
            </form>
        </div>
    }

    function handleEnroll(): void {
        if (!userData) {
            throw new Error('User data not yet loaded!');
        }
        if (!userData.email) return;

        updateUserTrainingCourses(userData.uid, course.id)
    }

    async function handleAssign(): Promise<void> {
        if (assignedEmail !== "") {
            try {
                await updateUserTrainingCoursesByEmail(assignedEmail, course.id);
                toast.success("User has been allocated training!");
            } catch (error) {
                if (error instanceof UserNotFoundError) {
                    toast.warn('User not found!');
                } else {
                    throw error;
                }
            }
        } else {
            toast.warn("No email found for user, please try again.");
        }
    }

    function handleViewtraining() {
        navigate("/view-training", { state: { search: course.id } });
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
                    (ID: {course.id})
                </p>
                <h2>
                    --------
                </h2>
                <div className="d-flex flex-row x-3 mt-5">
                    {enrollElement}
                    {assignElement}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default TrainingContainer;

