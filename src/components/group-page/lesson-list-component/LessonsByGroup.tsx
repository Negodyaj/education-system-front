import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  setIsOpenModalAddLesson,
  setIsOpenModalAttendance,
} from '../../../store/group-page/lesson/action-creators';

import {
  AttendanceLesson,
  CommonButton,
  CreateLesson,
  LessonsContainer,
} from './LessonsByGroupStyled';
import LessonsTableByGroup from './LessonsTableByGroup';
import ModalAttendance from './ModalAttendance';
import NewLesson from './NewLesson';

const LessonsByGroup = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.lessonByGroup);

  const openUpModalAddLesson = () => {
    dispatch(setIsOpenModalAddLesson());
  };

  const openUpModalAttendance = () => {
    dispatch(setIsOpenModalAttendance());
  };

  return (
    <LessonsContainer>
      <CreateLesson>
        <CommonButton onClick={openUpModalAddLesson}>
          Запланировать
        </CommonButton>
      </CreateLesson>
      <LessonsTableByGroup />
      <AttendanceLesson>
        <CommonButton onClick={openUpModalAttendance}>
          Посещаемость
        </CommonButton>
        <CommonButton>Обратная связь</CommonButton>
      </AttendanceLesson>
      {pageState.isOpenModalAddLesson && <NewLesson />}
      {pageState.isOpenModalAttendance && <ModalAttendance />}
    </LessonsContainer>
  );
};

export default LessonsByGroup;
