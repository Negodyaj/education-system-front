import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CourseEdition from './course-edition/CourseEdition';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NewCourse from './NewCourse';
import { DataNewCourse } from './NewCourse';
import { Course } from '../../shared/courses/Courses';
import { sendPostRequest } from '../../services/http.service';
import { getToken } from '../../services/auth.service';

interface CoursesPageProps {
    roleId: number;
}

function CoursesPage(props: CoursesPageProps) {

    const url = 'https://80.78.240.16:7070/api/Course/';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0J_RgNC10L_QvtC00LDQstCw0YLQtdC70YwiLCLQnNC10L3QtdC00LbQtdGAIl0sIm5iZiI6MTYxNzY5NDYzNCwiZXhwIjoxNjE3ODY3NDM0LCJpc3MiOiJFZHVjYXRpb25TeXN0ZW0uQXBpIiwiYXVkIjoiRGV2RWR1Y2F0aW9uIn0.Mb_LYjXFxFH9oXrNvW1tK0mqwaMglimBI75M9IBfF4I' ;

    const getCourses = () => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setCoursesList(data);
            })
            .catch(error => console.log('Ошибка ' + error))
    }

    useEffect(() => {
        getCourses();
    }, []);

    const addCourse = async (newCourse: DataNewCourse) => {
        //(await sendPostRequest<Course>('Course/', newCourse));
        getCourses();
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newCourse)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         getCourses();
        //     })
        //     .catch(error => console.log('Ошибка ' + error))
    }

    const deleteCourse = (id: number) => {
        fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getCourses();
            })
            .catch(error => console.log('Ошибка ' + error))
    }

    let courses: Course[] = [];

    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState(courses);
    const [idCourseDelete, setIdCourseDelete] = useState(0);

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
                    coursesList.map(item => (
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
