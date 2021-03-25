import './InputNameCourse.css';

function InputNameCourse() {
    return(
        <div className="input-course-container">
            <div className="course-name">
                <input className="input-course-name" placeholder="Введите название курса"></input>
            </div>
            <div className="create-new-course">
                <button className="button-create-new-course"></button>
            </div>
        </div>
    )
}

export default InputNameCourse;