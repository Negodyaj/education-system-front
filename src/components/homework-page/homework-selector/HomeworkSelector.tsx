import { useSelector } from "react-redux"
import { IRootState } from "../../../store"
import { HomeworksByCourse } from "../../../store/state"

export function HomeworkSelector() {
    const appState = useSelector((state: IRootState) => state)
    return (
        <div className="selector">
            {
                Object.keys(appState.homeworkPage.homeworkListMethodist).map(courseName =>
                    <div className="course-item">
                        <div className="title">{courseName}</div>
                        {
                            appState.homeworkPage.homeworkListMethodist[courseName as keyof HomeworksByCourse].map(hw => {
                                return (
                                    <div className="homework-item">
                                        <div className="row">
                                            <div>{hw.description}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}