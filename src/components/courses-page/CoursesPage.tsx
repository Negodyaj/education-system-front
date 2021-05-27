import React, { useEffect } from 'react';
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
import {
  CommonButton,
  RoundButton,
} from '../../shared/styled-components/buttonStyledComponent';

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
        <CommonButton onClick={openModalAdd}>Добавить курс</CommonButton>
        )}
      </CourseCreate>
      <CoursesList>
        {pageState.isDataLoading ? (
          <Loading />
        ) : (
          pageState.courseList.map((item) => (
            <CourseStyled>
              <LinkStyledRegularFont
                className="current-course-name"
                to={`/course/${item.id}/edition`}>
                <EmptyDiv>{item.name}</EmptyDiv>
              </LinkStyledRegularFont>
              <CourseUpdateDelete>
                <Link to={`/course/${item.id}/edition`}>
                  {currentRole === 5 && (
                  <RoundButton>
                    <FontAwesomeIcon icon="edit" />
                  </RoundButton>
                  )}
                </Link>
                {currentRole === 5 && (
                <RoundButton onClick={() => openModalDelete(item.id)}>
                  <FontAwesomeIcon icon="trash" />
                </RoundButton>
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
