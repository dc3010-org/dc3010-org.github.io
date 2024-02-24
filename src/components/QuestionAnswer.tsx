import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Container.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { QuestionAnswerContainer } from "../data/TrainingCourse";

function QuestionAnswer(props: { current: QuestionAnswerContainer, onDelete: () => void, onChange: (value: QuestionAnswerContainer) => void }) {
    const onChange = (prop: keyof QuestionAnswerContainer): React.ChangeEventHandler<HTMLInputElement> => (e) => {
        props.onChange({
            ...props.current,
            [prop]: e.target.value,
        });
    };


    return (
        <div>
            <div className="d-flex justify-content-around flex-wrap m-3 bg-success bg-opacity-10">
                <div className="border border-secondary-subtle p-3 d-flex flex-column container-border-style vw-100">
                    <div className="d-inline-flex flex-row-reverse">
                        <button className="btn btn-danger" onClick={props.onDelete}><FontAwesomeIcon icon={faX} /></button>
                    </div>
                    <p>Question</p>
                    <input type="text" className="form-control" placeholder='' aria-label='question' value={props.current.question} onChange={onChange('question')}></input>
                    <p>Answer</p>
                    <input type="text" className="form-control" aria-label='answer' value={props.current.answer} onChange={onChange('answer')}></input>
                </div>
            </div>
        </div>
    )
}

export default QuestionAnswer;