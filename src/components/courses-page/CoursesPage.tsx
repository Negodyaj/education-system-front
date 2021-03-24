import React, { useState } from 'react';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';

interface CoursesPageProps {
    roleId: number;
}
let idCourseDelete = 0;
let idCoursesDelete: number[] = [];


function CoursesPage(props: CoursesPageProps) {
    
    const courses = [ 
        { id: 1, name: 'C# base' }, 
        { id: 2, name: 'Backend' }, 
        { id: 3, name: 'Frontend' },
        { id: 4, name: 'Mobile development' } 
    ];

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [coursesList, setCoursesList] = useState(courses);

    const openModal = (id: number) => {
        setIsModalDelete(true);
        idCourseDelete = id;
    }

    const onDeleteHandler = (num: number) => {
        setIsModalDelete(false);
        if (num === 1) {
            idCoursesDelete.push(idCourseDelete);
            setCoursesList(courses.filter((item) => !(idCoursesDelete.includes(item.id))));
        }
    }


    return(
        <div className="course-container">
            <div className="course-create">
                <button className='button-create'>Добавить курс</button>
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
            { isModalDelete && <ModalWindowDelete onClickDelete={onDeleteHandler}/>}
        </div>
    )
}

export default CoursesPage;