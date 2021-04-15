import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CourseEdition from './course-edition/CourseEdition';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NewCourse from './NewCourse';
import { DataNewCourse } from './NewCourse';
import { Course } from '../../shared/courses/Courses';
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from '../../services/http.service';
import { CourseAddEnd, CourseDeleteEnd, CourseEnd } from '../../shared/endpointConsts';
import { responseHandlers } from '../../services/response-handler/responseHandler';
import NotificationData from '../../interfaces/NotificationData';

interface CoursesPageProps {
    roleId: number;
    sendNewNotification: (newNotification: NotificationData | undefined) => void;
}

function CoursesPage(props: CoursesPageProps) {

    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState<Course[]>();
    const [idCourseDelete, setIdCourseDelete] = useState(0);

    const getCourses = async () => {
        setCoursesList(await sendGetRequest<Course[]>(CourseEnd, props.sendNewNotification, responseHandlers[CourseEnd]));
    }

    useEffect(() => {
        getCourses();
    }, []);

    const addCourse = async (newCourse: DataNewCourse) => {
        await sendPostRequest<Course>(CourseEnd, props.sendNewNotification, responseHandlers[CourseAddEnd], newCourse);
        getCourses();
    }

    const deleteCourse = async (id: number) => {
        await sendDeleteRequest<Course>(CourseEnd + '/' + id, props.sendNewNotification, responseHandlers[CourseDeleteEnd]);
        getCourses();
    }

    const openModalDelete = (id: number) => {
        setIsModalDelete(true);
        setIdCourseDelete(id);
    }

    const onDeleteHandler = (num: number) => {
        if (num === 1) {
            deleteCourse(idCourseDelete);
        }
        setIsModalDelete(false);
    }

    const openModalAdd = () => {
        setIsModalAdd(true);
    }

    const addNewCourse = (data?: DataNewCourse) => {
        if(data?.name === '' || data?.description === '' || data?.duration === 0) {
            return;
        } else if (data !== undefined) {
            addCourse(data);
        }
        setIsModalAdd(false);
    }

    return(
        <div className="course-container">
            <div className="course-create">
                <div> </div>
                <button onClick={openModalAdd} className='button-create'>Добавить курс</button> 
            </div>
            <div className="courses-list">
                {
                    coursesList?.map(item => (
                        <div key={item.id} className="course">
                            <div className="current-course-name">{item.name}</div>
                            <div className="course-update-delete">
                                <Link to={"/course-edition/" + item.id}>
                                    <button className='button-update'>
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                </Link>
                                <button onClick={() => openModalDelete(item.id)} className='button-delete'>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            { isModalAdd && <NewCourse dataNewCourse={addNewCourse} /> }
            { isModalDelete && <ModalWindowDelete onClickDelete={onDeleteHandler}/>}
        </div>
    )
}

export default CoursesPage;
