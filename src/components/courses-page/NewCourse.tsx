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
    let descriptionCourse = React.createRef<HTMLTextAreaElement>();

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
                    <div className="head-modal"><h4>Создать новый курс</h4></div>
                    <button className="button-close" onClick={closeModalWindow}>
                        <FontAwesomeIcon icon='times'/>
                    </button>
                </div>
                <div className="create-course">
                    <div className='new-course-header'>Название курса</div>
                    <div className="course-data">
                        <input type="text" className="course-name" placeholder="Самый лучший курс" ref={nameNewCourse} />
                    </div>
                    <div className='new-course-header'>Описание курса</div>
                    <div className="course-data">
                        <textarea className="course-description" placeholder="Описание самого лучшего курса" ref={descriptionCourse} />
                    </div>
                </div>
                <div className="select-delete">
                    <button className="button-select" onClick={closeModalWindow}>Отменить</button>
                    <button className="button-select" onClick={showInput}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default NewCourse;