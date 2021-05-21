import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { CourseInput } from '../../../../../interfaces/CourseInput';
import { IRootState } from '../../../../../store';
import { showToggleModalCreateCourseAction } from '../../../../../store/courses-page/action-creators';
import { createCourse } from '../../../../../store/courses-page/thunk';
import {
  ButtonClose,
  HeadModal,
  ModalHeader,
  SelectDelete,
} from '../../ModalWindowCreateFormStyled';

function NewCourse() {
  const dispatch = useDispatch();
  const appState = useSelector(
    (state: IRootState) => state.coursePage.createCourseInputModel
  );
  const formCourse = useForm<CourseInput>();

  const closeModalWindow = () => {
    dispatch(showToggleModalCreateCourseAction());
  };

  const createDataNewCourse = (dataNewCourse: CourseInput) => {
    dispatch(createCourse(dataNewCourse));
  };

  const onSubmit = (dataCourse: CourseInput) => {
    createDataNewCourse(dataCourse);
  };

  return <></>;
}
export default NewCourse;
