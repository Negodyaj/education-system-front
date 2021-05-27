import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../store';
import {
  getCourses,
  showToggleModalDeleteCourseAction,
  courseIdForDelete,
} from '../../store/courses-page/action-creators';
import { LinkStyledRegularFont } from '../../shared/styled-components/globalStyledConsts';
import { toggleModalWindow } from '../../store/modal-window/action-creators';
import { ChildIndex } from '../../enums/ChildIndex';

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
  const currentRole = useSelector(
    (state: IRootState) => state.roleSelector.currentUserRoleId
  );

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const openModalDelete = (id: number) => {
    dispatch(showToggleModalDeleteCourseAction());
    dispatch(courseIdForDelete(id));
  };

  const openModalAdd = () => {
    dispatch(toggleModalWindow(ChildIndex.NewCourse));
  };

  return (
    <CourseContainer>
      <CourseCreate>
        <EmptyDiv />
        {currentRole === 5 && (
          <button onClick={openModalAdd} className="common-button">
            Добавить курс
          </button>
        )}
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
                  {currentRole === 5 && (
                    <button className="round-button">
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </Link>
                {currentRole === 5 && (
                  <button
                    onClick={() => openModalDelete(item.id)}
                    className="round-button">
                    <FontAwesomeIcon icon="trash" />
                  </button>
                )}
              </CourseUpdateDelete>
            </CourseStyled>
          ))
        )}
      </CoursesList>
      {pageState.isModalDelete && <ModalWindowDelete />}
    </CourseContainer>
  );
}

export default CoursesPage;
