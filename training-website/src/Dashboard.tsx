import NavBar from "./components/Navbar"

function Dashboard() {
    return (
        <div>
            <NavBar />
            <div className="conainer-fluid">
                <div className="row">
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"></div>
                    <header className="d-flex justify-content-around flex-wrap">
                        <h1>Training courses you are currently enrolled on:</h1>
                    </header>
                    <body>
                        <div>
                            <div className="d-flex justify-content-around flex-wrap m-3">
                                <div className="border border-dark rounded px-3 d-flex my-3">
                                    <img className="w-50 border border-muted my-3"
                                        src="../images/OnlineLearning.jpg" alt="Online Learning" />
                                    <div className="flex-grow-1 m-3">
                                        <h2>
                                            Title of training
                                        </h2>
                                        <p className="text-muted">
                                            Description of training
                                        </p>
                                        <h2>
                                            --------
                                        </h2>
                                        <h2 className="text-muted">
                                            Completion status
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;