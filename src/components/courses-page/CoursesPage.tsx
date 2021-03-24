import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CourseEdition from './course-edition/CourseEdition';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';


interface CoursesPageProps {
    roleId: number;
}

function CoursesPage(props: CoursesPageProps) {

    const courses = [ 
        { id: 1, name: 'C# base' }, 
        { id: 2, name: 'Backend' }, 
        { id: 3, name: 'Frontend' },
        { id: 4, name: 'Mobile development' } 
    ];

    let idCoursesDeleteForState: number[] = [];

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState(courses);
    const [idCourseDelete, setIdCourseDelete] = useState(0);
    const [idCoursesDelete, setIdCoursesDelete] = useState(idCoursesDeleteForState);

    const openModal = (id: number) => {
        setIsModalDelete(true);
        setIdCourseDelete(id);
    }

    const onDeleteHandler = (num: number) => {
        setIsModalDelete(false);
        if (num === 1) {
            idCoursesDeleteForState.push(idCourseDelete);
            for(let i of idCoursesDeleteForState) {
                console.log(i);
            }
            setIdCoursesDelete(idCoursesDeleteForState);
            setCoursesList(courses.filter((item) => !(idCoursesDelete.includes(item.id))));
        }
    }


    return(
        <div className="course-container">
            <div className="course-create">
                <Link to="/course-edition">
                    <button className='button-create'>Добавить курс</button>
                </Link>
            </div>
            <div className="courses-list">
                {
                    coursesList.map(item => (
                        <div key={item.id} className="course">
                            <div className="course-name">{item.name}</div>
                            <div className="course-update-delete">
                                <button className='button-update'></button>
                                <button onClick={() => openModal(item.id)} className='button-delete'></button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="course-create">
                <Route path="/course-edition">
                    <div className="select-users">
                        <CourseEdition />
                    </div>
                </Route>
            </div>
            { isModalDelete && <ModalWindowDelete onClickDelete={onDeleteHandler}/>}
        </div>
    )
}

export default CoursesPage;