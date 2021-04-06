import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';
import Select from 'react-select/src/Select';
import { SelectItem } from '../interfaces/SelectItem';
import CustomMultiSelect from '../multi-select/CustomMultiSelect';

export interface DataNewCourse { 
    name: string; 
    description: string;
    duration: number
}

interface NewCourseProps{
    dataNewCourse: (data?: DataNewCourse) => void
}

function NewCourse(props: NewCourseProps) {

    let nameNewCourse = React.createRef<HTMLInputElement>();
    let descriptionNewCourse = React.createRef<HTMLTextAreaElement>();
    let durationNewCourse = React.createRef<HTMLInputElement>();

    const closeModalWindow = () => {
        props.dataNewCourse();
    }

    const showInput = () => {
        props.dataNewCourse(
            {
                name: `${nameNewCourse.current?.value}`,
                description: `${descriptionNewCourse.current?.value}`,
                duration: Number(durationNewCourse.current?.value)
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
                        <textarea className="course-description" placeholder="Описание самого лучшего курса" ref={descriptionNewCourse} />
                    </div>
                    <div className='new-course-header'>Продолжительность курса</div>
                    <div className="course-data">
                        <input type="text" className="course-duration" ref={durationNewCourse} />
                        <div className="duration-course-text">месяц(а)</div>
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