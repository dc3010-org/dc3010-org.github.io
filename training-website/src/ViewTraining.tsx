import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function ViewTraining() {

    const renderedContainers = <p></p>;

    function checkAnswers() {
        return;
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <div className="d-flex flex-row">
                            <div className="flex-grow-1 flex-column">
                                <h1>Name of course</h1>
                            </div>
                            <div className="p-2">
                                <button type="button" className="btn btn-primary btn-lg" aria-label='save-training-course' onClick={checkAnswers}><FontAwesomeIcon icon={faCheck} /> Check Answers</button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-center flex-column">
                                <div className="row">
                                    {renderedContainers}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ViewTraining;