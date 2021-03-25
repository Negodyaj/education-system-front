import './InputNameCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface InputNameCourseProps{
    onClick: (name: string) => void
}

function InputNameCourse(props: InputNameCourseProps) {
    const clickHandler = () => {
        for (let i = 0; i < 1; i++){
            props.onClick('ghjnd');
        }
    }

    return(
        <div className="input-course-container">
            <div className="course-name">
                <input className="input-course-name" placeholder="Введите название курса" />
            </div>
            <div className="create-new-course">
                <button onClick={clickHandler} className="button-create-new-course"><FontAwesomeIcon icon='plus' /></button>
            </div>
        </div>
    )
}

export default InputNameCourse;