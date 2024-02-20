import { TrainingCourse } from "../data/TrainingCourse";

function TrainingContainer({ course }: { course: TrainingCourse }) {
    return (
        <div className="border border-dark rounded px-3 d-flex my-3">
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
                    Completion status:
                </h2>
            </div>
        </div>
    )
}

export default TrainingContainer;