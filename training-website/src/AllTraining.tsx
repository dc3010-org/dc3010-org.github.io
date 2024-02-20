import { LoadingState, useFirebase } from "./FirebaseProvider";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TrainingContainer from "./components/TrainingContainer";

function AllTraining() {

    const { loadingState, trainingCourses } = useFirebase();

    if (loadingState === LoadingState.Loading) {
        return <p>Loading...</p>
    } else if (loadingState === LoadingState.Error) {
        return <p>Whoops! *Something* went wrong!</p>
    }

    const renderedCourses = trainingCourses.map(course => <TrainingContainer course={course} />);

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <header className="d-flex justify-content-center flex-column">
                            <h1>Available Training Courses:</h1>
                            <div className="border border-primary-subtle rounded px-3 d-flex my-3">
                                <form>
                                    <div className="input-group m-3">
                                        <input type="text" className="form-control" placeholder='Excel tools, Word etc.' aria-label='search-term'></input>
                                        <input type="submit" value="Search"></input>
                                    </div>
                                </form>
                            </div>
                        </header>
                        <div>
                            <div>
                                <div className="d-flex justify-content-around flex-wrap m-3">
                                    {renderedCourses}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTraining;