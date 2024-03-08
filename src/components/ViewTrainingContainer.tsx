import { useState } from "react";
import { Container } from "../data/TrainingCourse";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

function ViewTrainingContainer({ part, isCorrect, setCorrect }: { part: Container, isCorrect: boolean, setCorrect: () => void }) {
    const [guess, setGuess] = useState("");

    function handleAnswer() {
        if (part.type === "qa" && guess.trim() === part.answer.trim()) {
            setCorrect();

        } else {
            toast.warn("Incorrect answer, try again!");
        }
    }


    let renderedContainer;

    if (part.type === "qa") {

        let renderedButton;

        if (isCorrect) {
            renderedButton = <button
                type="button"
                className="btn btn-success btn-lg disabled"
                aria-label='correct-answer-button'
                disabled>
                <FontAwesomeIcon icon={faCheck} /> Correct!
            </button>
        } else {
            renderedButton = <button
                type="button"
                className="btn btn-primary btn-lg"
                aria-label='check-answer-button'
                onClick={handleAnswer}>
                Check answer
            </button>
        }
        renderedContainer = <div><p className="fs-3 fw-light">{part.question}</p>
            <ToastContainer />
            <div>
                <div className="input-group">
                    <input type="text" className="form-control" aria-label="answer-box" placeholder="Enter your answer here..." onChange={(e) => setGuess(e.target.value)}></input>
                    {renderedButton}
                    <hr className="w-100 border-secondary border-4 rounded-pill mx-3" />
                </div>
            </div>
        </div>
    } else if (part.type === "description") {
        renderedContainer = <div><p className="fs-3 fw-light">{part.description}</p>
            <div>
                <div className="input-group">
                    <hr className="w-100 border-secondary border-4 rounded-pill mx-3" />
                </div>
            </div>
        </div>
    }

    return (
        <div className="vw-100 px-3 d-flex my-3 flex-column">
            {renderedContainer}
        </div>
    )
}

export default ViewTrainingContainer;