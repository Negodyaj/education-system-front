import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CourseEdition from './course-edition/CourseEdition';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputNameCourse from './InputNameCourse';
import { courses, Course } from '../../shared/courses/Courses';


interface CoursesPageProps {
    roleId: number;
}

function CoursesPage(props: CoursesPageProps) {

    let filterId: number [];
    let idCoursesDeleteForState: number[] = [];
    let newCourse = {} as Course;
    let newCoursesList: Course[] = [];

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState(courses);
    const [idCourseDelete, setIdCourseDelete] = useState(0);
    const [idCoursesDelete, setIdCoursesDelete] = useState(idCoursesDeleteForState);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);

    const openModal = (id: number) => {
        setIsModalDelete(true);
        let idCourse = id;
        setIdCourseDelete(idCourse);
    }

    const onDeleteHandler = (num: number) => {
        setIsModalDelete(false);
        if (num === 1) {
            filterId = idCoursesDelete;
            filterId.push(idCourseDelete);
            for(let i of filterId) {
                console.log(i);
            }
            setIdCoursesDelete(filterId);
            setCoursesList(coursesList.filter((item) => !(idCoursesDelete.includes(item.id))));
        }
    }

    const createCourseHandler = () => {
        setIsOpenPopUp(true);
    }

    const addNewCourse = (name: string) => {
        newCourse = { id: coursesList.length + 1, name: name };
        newCoursesList = coursesList;
        newCoursesList.push(newCourse);
        setCoursesList(newCoursesList);
        setIsOpenPopUp(false);
    }
 
    return(
        <div className="course-container">
            <div className="course-create">
                {
                    isOpenPopUp ? <InputNameCourse onClick={addNewCourse} /> : <div></div>
                }
                <button onClick={createCourseHandler} className='button-create'>Добавить курс</button> 
            </div>
            <div className="courses-list">
                {
                    coursesList.map(item => (
                        <div key={item.id} className="course">
                            <div className="course-name">{item.name}</div>
                            <div className="course-update-delete">
                                <Link to={"/course-edition/" + item.id}>
                                    <button className='button-update'>
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                </Link>
                                <button onClick={() => openModal(item.id)} className='button-delete'>
                                    <FontAwesomeIcon icon="trash-alt" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            { isModalDelete && <ModalWindowDelete onClickDelete={onDeleteHandler}/>}
        </div>
    )
}

export default CoursesPage;