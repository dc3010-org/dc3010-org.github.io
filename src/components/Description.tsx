import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Container.css";
import { DescriptionContainer } from "../data/TrainingCourse";

function Description(props: { current: DescriptionContainer, onDelete: () => void, onChange: (value: DescriptionContainer) => void }) {
    const onChange = (prop: keyof DescriptionContainer): React.ChangeEventHandler<HTMLInputElement> => (e) => {
        props.onChange({
            ...props.current,
            [prop]: e.target.value,
        });
    };
    return (
        <div>
            <div className="d-flex justify-content-around flex-wrap m-3 bg-info bg-opacity-10">
                <div className="border border-secondary-subtle p-3 d-flex flex-column container-border-style vw-100">
                    <div className="d-inline-flex flex-row-reverse">
                        <button className="btn btn-danger" onClick={props.onDelete}><FontAwesomeIcon icon={faX} /></button>
                    </div>
                    <p>Description</p>
                    <input type="text" className="form-control" aria-label='description' value={props.current.description} onChange={onChange('description')}></input>
                </div>
            </div>
        </div>
    )
}

export default Description;