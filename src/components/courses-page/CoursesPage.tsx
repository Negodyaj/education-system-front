import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewCourse from './NewCourse';
import { DataNewCourse } from './NewCourse';
import { Course } from '../../interfaces/Courses';
import { sendPostRequest } from '../../services/http.service';
import { CourseEnd } from '../../shared/endpointConsts';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from '../../store';
import { isCourse } from '../../services/type-guards/course';
import { getCourses } from '../../store/courses-page/thunk';
import { closeModalCreateCourse, showOpenModalCreateCourse, showOpenModalDeleteCourse } from '../../store/courses-page/action-creators';

function CoursesPage() {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.coursePage);

    useEffect(() => {
        dispatch(getCourses());
    }, []);

    const addCourse = async (newCourse: DataNewCourse) => {
        await sendPostRequest<Course>(CourseEnd, isCourse, newCourse);
        dispatch(getCourses());
        dispatch(closeModalCreateCourse());
    }
    //openModalDelete done
    const openModalDelete = (id: number) => {
        dispatch(showOpenModalDeleteCourse(id));
    }

    //OpenModalAdd done
    const openModalAdd = () => {
        dispatch(showOpenModalCreateCourse());
    }

    const addNewCourse = (data?: DataNewCourse) => {
        if(data?.name === '' || data?.description === '' || data?.duration === 0) {
            return;
        } else if (data !== undefined) {
            addCourse(data);
        }
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
                                    <div className="current-course-name">{item.name}</div>
                                    <div className="course-update-delete">
                                        <Link to={"/course-edition/" + item.id}>
                                            <button className='button-update'>
                                                <FontAwesomeIcon icon="edit" />
                                            </button>
                                        </Link>
                                        <button onClick={() => {openModalDelete(item.id)}} className='button-delete'>
                                            <FontAwesomeIcon icon="trash" /> 
                                        </button>
                                    </div>
                                </div>
                            ))
                }
            </div>
            { pageState.isOpenModalCreateCourse && <NewCourse dataNewCourse={addNewCourse} /> }
            { pageState.isModalDelete && <ModalWindowDelete />}
        </div>
    )
}

export default CoursesPage;
