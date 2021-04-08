import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
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

    const [isNameNewCourseFilled, setIsNameNewCourseFilled] = useState(false);
    const [isDescriptionNewCourseFilled, setIsDescriptionNewCourseFilled] = useState(false);
    const [isDurationNewCourseFilled, setIsDurationNewCourseFilled] = useState(false);

    const closeModalWindow = () => {
        props.dataNewCourse();
    }

    const showDataNewCourse = () => {
        props.dataNewCourse(
            {
                name: `${nameNewCourse.current?.value}`,
                description: `${descriptionNewCourse.current?.value}`,
                duration: Number(durationNewCourse.current?.value)
            }
        );
        setIsNameNewCourseFilled(nameNewCourse.current?.value === '' ? true : false);
        setIsDescriptionNewCourseFilled(descriptionNewCourse.current?.value === '' ? true : false);
        setIsDurationNewCourseFilled(durationNewCourse.current?.value === '' ? true : false);
    }

    return(
        <div className="modal-back">
            <div className="modal-add-course">
                <div className="modal-header-add-course">
                    <div className="head-modal"><h4>Создать новый курс</h4></div>
                    <button className="button-close" onClick={closeModalWindow}>
                        <FontAwesomeIcon icon='times'/>
                    </button>
                </div>
                <div className="create-course">
                    <div className='new-course-header'>Название курса</div>
                    <div className="course-data">
                        <input type="text" className="course-name" placeholder="Введите название курса" ref={nameNewCourse} />
                    </div>
                    { 
                        isNameNewCourseFilled ? <div className="error-no-name">Заполните данное поле</div> : <div></div> 
                    }
                    <div className='new-course-header'>Описание курса</div>
                    <div className="course-data">
                        <textarea className="course-description" placeholder="Введите описание курса" ref={descriptionNewCourse} />
                    </div>
                    { 
                        isDescriptionNewCourseFilled ? <div className="error-no-description">Заполните данное поле</div> : <div></div> 
                    }
                    <div className='new-course-header'>Продолжительность курса</div>
                    <div className="course-data">
                        <input type="number" min={1} className="course-duration" ref={durationNewCourse} />
                        <div className="duration-course-text">месяца(ов)</div>
                    </div>
                    { 
                        isDurationNewCourseFilled ? <div className="error-no-duration">Заполните данное поле</div> : <div></div> 
                    }
                </div>
                <div className="select-delete">
                    <button className="button-select" onClick={closeModalWindow}>Отменить</button>
                    <button className="button-select" onClick={showDataNewCourse}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default NewCourse;