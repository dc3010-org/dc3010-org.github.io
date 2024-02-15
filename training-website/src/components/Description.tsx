function Description(props: { onDelete: () => void }) {
    return (
        <div>
            <div className="d-flex justify-content-around flex-wrap m-3">
                <div className="border border-dark rounded p-3 d-flex flex-column">
                    <p>description</p>
                    <input type="text" className="form-control" aria-label='description'></input>
                    <button className="btn btn-danger" onClick={props.onDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Description;