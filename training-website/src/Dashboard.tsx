import NavBar from "./components/Navbar"
import Sidebar from "./components/Sidebar";

function Dashboard() {
    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <header className="d-flex justify-content-around flex-wrap">
                            <h1>Training courses you are currently enrolled on:</h1>
                        </header>
                        <div>
                            <div>
                                <div className="d-flex justify-content-around flex-wrap m-3">
                                    <div className="border border-dark rounded px-3 d-flex my-3">
                                        <img className="w-50 border border-muted my-3"
                                            src="/images/OnlineLearning.jpg" alt="Online Learning" />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;