import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { showToogleModalCreateCourseAction, unvalidataCourseDescription, unvalidataCourseDuration, unvalidataCourseName, validatedCourseDescription, validatedCourseDuration, validatedCourseName } from '../../store/courses-page/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { createCourse, getCourses } from '../../store/courses-page/thunk';
import { Course } from '../../interfaces/Courses';
import { idText } from 'typescript';

export interface DataNewCourse { 
    name: string; 
    description: string;
    duration: number
}

function NewCourse() {

    let nameNewCourse = React.createRef<HTMLInputElement>();
    let descriptionNewCourse = React.createRef<HTMLTextAreaElement>();
    let durationNewCourse = React.createRef<HTMLInputElement>();

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.coursePage);

    const closeModalWindow = () => {
        dispatch(showToogleModalCreateCourseAction());
        console.log(pageState.isOpenModalCreateCourse)
    }

    const showDataNewCourse = () => {
        if (
            nameNewCourse.current?.value !== '' ||
            descriptionNewCourse.current?.value !== '' ||
            Number(durationNewCourse.current?.value) !== 0
            )
            {
                dispatch(createCourse(
                    {
                    name: `${nameNewCourse.current?.value}`,
                    description: `${descriptionNewCourse.current?.value}`,
                    duration: Number(durationNewCourse.current?.value)
                    }
                )) 
                dispatch(getCourses());
            } else {
            return;
        }
        
    }

    const validationInputs = () => {
        nameNewCourse.current?.value === '' ? dispatch(validatedCourseName()) : dispatch(unvalidataCourseName());
        descriptionNewCourse.current?.value === '' ? dispatch(validatedCourseDescription()) : dispatch(unvalidataCourseDescription());
        durationNewCourse.current?.value === '' ? dispatch(validatedCourseDuration()) : dispatch(unvalidataCourseDuration());
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
                        <input type="text" className="course-name" onChange={validationInputs} ref={nameNewCourse} placeholder='Введите название курса' required />
                    </div>
                    { 
                        pageState.isNameNewCourseFilled ? <div className="error-no-name">Заполните данное поле</div> : <div></div> 
                    }
                    <div className='new-course-header'>Описание курса</div>
                    <div className="course-data">
                        <textarea className="course-description" onChange={validationInputs} placeholder="Введите описание курса" ref={descriptionNewCourse} required />
                    </div>
                    { 
                        pageState.isDescriptionNewCourseFilled ? <div className="error-no-description">Заполните данное поле</div> : <div></div>
                    }
                    <div className='new-course-header'>Продолжительность курса</div>
                    <div className="course-data">
                        <input type="number" min={1} onChange={validationInputs} className="course-duration" ref={durationNewCourse} required />
                        <div className="duration-course-text">месяца(ов)</div>
                    </div>
                    { 
                        pageState.isDurationNewCourseFilled ? <div className="error-no-duration">Заполните данное поле</div> : <div></div> 
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