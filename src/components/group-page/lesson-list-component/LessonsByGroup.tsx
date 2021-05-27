import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import { setIsOpenModalAttendance } from '../../../store/group-page/lesson/action-creators';
import { toggleModalWindow } from '../../../store/modal-window/action-creators';
import { ChildIndex } from '../../../enums/ChildIndex';
import { Role } from '../../../enums/role';
import { CommonButton } from '../../../shared/styled-components/buttonStyledComponent';

import {
  AttendanceLesson,
  CreateLesson,
  LessonsContainer,
} from './LessonsByGroupStyled';
import LessonsTableByGroup from './lesson-list-table/LessonsTableByGroup';
import ModalAttendance from './modal-attendance/ModalAttendance';

const LessonsByGroup = (props: { id: number }) => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.lessonByGroup);
  const role = useSelector(
    (state: IRootState) => state.roleSelector.currentUserRoleId
  );

  const openUpModalAddLesson = () => {
    dispatch(toggleModalWindow(ChildIndex.NewLesson));
  };

  const openUpModalAttendance = () => {
    dispatch(setIsOpenModalAttendance());
  };

  return (
    <LessonsContainer>
      <CreateLesson>
        {role === Role.Teacher && (
          <CommonButton onClick={openUpModalAddLesson}>
            Запланировать
          </CommonButton>
        )}
      </CreateLesson>
      <LessonsTableByGroup />
      <AttendanceLesson>
        {role === Role.Teacher && (
          <CommonButton onClick={openUpModalAttendance}>
            Посещаемость
          </CommonButton>
        )}
        <CommonButton>Обратная связь</CommonButton>
      </AttendanceLesson>
      {pageState.isOpenModalAttendance && <ModalAttendance />}
    </LessonsContainer>
  );
};

export default LessonsByGroup;
