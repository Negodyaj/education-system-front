import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NewCourse from './NewCourse';
import { DataNewCourse } from './NewCourse';
import { Course } from '../../interfaces/Courses';
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from '../../services/http.service';
import { CourseAddEnd, CourseDeleteEnd, CourseEnd } from '../../shared/endpointConsts';
import { responseHandlers } from '../../services/response-handler/responseHandler';
import NotificationData from '../../shared/interfaces/NotificationData';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from '../../store';
import { isCourse } from '../../services/type-guards/course';
import { isCourseArr } from '../../services/type-guards/courseArr';

function CoursesPage() {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.coursePage);

    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState<Course[]>();
    const [idCourseDelete, setIdCourseDelete] = useState(0);

    const getCourses = async () => {
        setCoursesList(await sendGetRequest<Course[]>(CourseEnd, isCourseArr));
    }

    useEffect(() => {
        getCourses();
    }, []);

    // const addCourse = async (newCourse: DataNewCourse) => {
    //     await sendPostRequest<Course>(CourseEnd, isCourse, newCourse);
    //     getCourses();
    // }

    // const deleteCourse = async (id: number) => {
    //     await sendDeleteRequest<Course>(CourseEnd + '/' + id, isCourse);
    //     getCourses();
    // }

    // const openModalDelete = (id: number) => {
    //     setIsModalDelete(true);
    //     setIdCourseDelete(id);
    // }

    // const onDeleteHandler = (num: number) => {
    //     if (num === 1) {
    //         deleteCourse(idCourseDelete);
    //     }
    //     setIsModalDelete(false);
    // }

    // const openModalAdd = () => {
    //     setIsModalAdd(true);
    // }

    // const addNewCourse = (data?: DataNewCourse) => {
    //     if(data?.name === '' || data?.description === '' || data?.duration === 0) {
    //         return;
    //     } else if (data !== undefined) {
    //         addCourse(data);
    //     }
    //     setIsModalAdd(false);
    // }

    return(
        <div className="course-container">
            <div className="course-create">
                <div> </div>
                {/* <button onClick={openModalAdd} className='button-create'>Добавить курс</button>  */}
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
                                {/* <button onClick={() => openModalDelete(item.id)} className='button-delete'> */}
                                    {/* <FontAwesomeIcon icon="trash" /> */}
                                {/* </button> */}
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* { isModalAdd && <NewCourse dataNewCourse={addNewCourse} /> }
            { isModalDelete && <ModalWindowDelete onClickDelete={onDeleteHandler}/>} */}
        </div>
    )
}

export default CoursesPage;
