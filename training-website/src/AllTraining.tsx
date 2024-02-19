import { LoadingState, useFirebase } from "./FirebaseProvider";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { TrainingCourse } from "./data/TrainingCourse";


function MyComponent({ course }: { course: TrainingCourse }) {
    return <div className="border border-dark rounded px-3 d-flex my-3">
        <img className="w-50 border border-muted my-3"
            src="/images/OnlineLearning.jpg" alt="Online Learning" />
        <div className="flex-grow-1 m-3">
            <h2>
                {course.title}
            </h2>
            <p className="text-muted">
                {course.id}
            </p>
            <h2>
                --------
            </h2>
            <h2 className="text-muted">
                Completion status: fucked
            </h2>
        </div>
    </div>
}

function AllTraining() {

    const { loadingState, trainingCourses } = useFirebase();

    if (loadingState === LoadingState.Loading) {
        return <p>Loading...</p>
    } else if (loadingState === LoadingState.Error) {
        return <p>Whoops! *Something* went wrong!</p>
    }



    const renderedCourses = trainingCourses.map(course => <MyComponent course={course} />);

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