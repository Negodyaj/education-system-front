import './InputNameCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';

interface InputNameCourseProps{
    onClick: (name: string) => void
}

function InputNameCourse(props: InputNameCourseProps) {

    let textInput = React.createRef<HTMLInputElement>()

    const showInput = () => {
        props.onClick('' + textInput.current?.value);
    }

    return(
        <div className="input-course-container">
            <div className="input-course-text">
                <input type="text" className="input-course-name" placeholder="Введите название курса" ref={textInput} />
            </div>
            <div className="create-new-course">
                <button onClick={showInput} className="button-create-new-course"><FontAwesomeIcon icon='plus' /></button>
            </div>
        </div>
    )
}

export default InputNameCourse;