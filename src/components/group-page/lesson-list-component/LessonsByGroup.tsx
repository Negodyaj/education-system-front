import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';

import {
  AttendanceLesson,
  CommonButton,
  CreateLesson,
  LessonsContainer,
} from './LessonsByGroupStyled';
import LessonsTableByGroup from './LessonsTableByGroup';

function LessonsByGroup() {
  return (
    <LessonsContainer>
      <CreateLesson>
        <CommonButton>Запланировать</CommonButton>
      </CreateLesson>
      <LessonsTableByGroup />
      <AttendanceLesson>
        <CommonButton>Посещаемость</CommonButton>
        <CommonButton>Обратная связь</CommonButton>
      </AttendanceLesson>
    </LessonsContainer>
  );
}

export default LessonsByGroup;
