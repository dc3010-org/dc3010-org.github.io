

function QuestionAnswer(props: { onDelete: () => void }) {
    return (
        <div>
            <div className="d-flex justify-content-around flex-wrap m-3">
                <div className="border border-dark rounded p-3 d-flex flex-column">
                    <p>Question</p>
                    <input type="text" className="form-control" placeholder='' aria-label='question'></input>
                    <p>Answer</p>
                    <input type="text" className="form-control" aria-label='answer'></input>
                    <button className="btn btn-danger" onClick={props.onDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionAnswer;