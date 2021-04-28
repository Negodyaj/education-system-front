import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewCourse from './NewCourse';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from '../../store';
import { getCourses } from '../../store/courses-page/thunk';
import { showToggleModalCreateCourseAction, showToggleModalDeleteCourseAction } from '../../store/courses-page/action-creators';

function CoursesPage() {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.coursePage);
    
    useEffect(() => {
        dispatch(getCourses());
    }, []);

    const openModalDelete = (idCourse: number) => {
        dispatch(showToggleModalDeleteCourseAction(idCourse));
    }

    const openModalAdd = () => {
        dispatch(showToggleModalCreateCourseAction());
    }

    return (
        <div className="course-container">
            <div className="course-create">
                <div> </div>
                <button onClick={openModalAdd} className='button-create'>Добавить курс</button> 
            </div>
            <div className="courses-list">
                {
                    pageState.isDataLoading
                        ?
                            <div>Loading...</div>
                        :
                            pageState.courseList?.map(item => (
                                <div key={item.id} className="course">
                                    <Link className="current-course-name" to={`/course/${item.id}`}>
                                        <div >{item.name}</div>
                                    </Link>
                                    <div className="course-update-delete">
                                    <Link to={`/course/${item.id}/edition`}>
                                            <button className='button-update'>
                                                <FontAwesomeIcon icon="edit" />
                                            </button>
                                        </Link>
                                        <button onClick={() => { openModalDelete(item.id) }} className='button-delete'>
                                            <FontAwesomeIcon icon="trash" /> 
                                        </button>
                                    </div>
                                </div>
                            ))
                }
            </div>
            { pageState.isOpenModalCreateCourse && <NewCourse /> }
            { pageState.isModalDelete && <ModalWindowDelete />}
        </div>
    )
}

export default CoursesPage;
