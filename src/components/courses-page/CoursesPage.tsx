import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../store';
import { getCourses } from '../../store/courses-page/thunk';
import {
  showToggleModalCreateCourseAction,
  showToggleModalDeleteCourseAction,
} from '../../store/courses-page/action-creators';
import { LinkStyledRegularFont } from '../../shared/styled-components/globalStyledConsts';

import NewCourse from './NewCourse';
import ModalWindowDelete from './modal-window/ModalWindowDelete';
import {
  CourseContainer,
  CourseCreate,
  CoursesList,
  CourseStyled,
  CourseUpdateDelete,
  EmptyDiv,
  Loading,
} from './CoursePageStyled';

function CoursesPage() {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.coursePage);

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const openModalDelete = (idCourse: number) => {
    dispatch(showToggleModalDeleteCourseAction(idCourse));
  };

  const openModalAdd = () => {
    dispatch(showToggleModalCreateCourseAction());
  };

  return (
    <CourseContainer>
      <CourseCreate>
        <EmptyDiv />
        <button onClick={openModalAdd} className="common-button">
          Добавить курс
        </button>
      </CourseCreate>
      <CoursesList>
        {pageState.isDataLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          pageState.courseList.map((item) => (
            <CourseStyled>
              <LinkStyledRegularFont
                className="current-course-name"
                to={`/course/${item.id}`}>
                <EmptyDiv>{item.name}</EmptyDiv>
              </LinkStyledRegularFont>
              <CourseUpdateDelete>
                <Link to={`/course/${item.id}/edition`}>
                  <button className="round-button">
                    <FontAwesomeIcon icon="edit" />
                  </button>
                </Link>
                <button
                  onClick={() => {
                    openModalDelete(item.id);
                  }}
                  className="round-button">
                  <FontAwesomeIcon icon="trash" />
                </button>
              </CourseUpdateDelete>
            </CourseStyled>
          ))
        )}
      </CoursesList>
      {pageState.isOpenModalCreateCourse && <NewCourse />}
      {pageState.isModalDelete && <ModalWindowDelete />}
    </CourseContainer>
  );
}

export default CoursesPage;
