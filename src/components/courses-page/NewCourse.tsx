import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';

export interface DataNewCourse { 
    name: string; 
    description: string;
}

interface NewCourseProps{
    dataNewCourse: (data?: DataNewCourse) => void
}

function NewCourse(props: NewCourseProps) {

    let nameNewCourse = React.createRef<HTMLInputElement>();
    let descriptionCourse = React.createRef<HTMLInputElement>();

    const closeModalWindow = () => {
        props.dataNewCourse();
    }

    const showInput = () => {
        props.dataNewCourse(
            {
                name: `${nameNewCourse.current?.value}`,
                description: `${descriptionCourse.current?.value}`
            }
        );
    }

    return(
        <div className="modal-back">
            <div className="modal-add-course">
                <div className="modal-header">
                <button className="button-close" onClick={closeModalWindow}>X</button>
                </div>
                <div className="input-course-text">
                    <input type="text" className="input-course-name" placeholder="Введите название курса" ref={nameNewCourse} />
                    <input type="text" className="input-course-name" placeholder="Введите описание курса" ref={descriptionCourse} />
                </div>
                <div className="select-delete">
                    <button className="button-undo" onClick={closeModalWindow}>Отменить</button>
                    <button className="button-add" onClick={showInput}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default NewCourse;