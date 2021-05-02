import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setIsOpenModalAttendance } from '../../../store/group-page/lesson/action-creators';
import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';
import { AttendanceLesson, CommonButton, CreateLesson, LessonsContainer } from './LessonsByGroupStyled';
import LessonsTableByGroup from './LessonsTableByGroup';
import ModalAttendance from './ModalAttendance';

const LessonsByGroup = () => {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.lessonByGroup);

    const openUpModalAttendance = () => {
        dispatch(setIsOpenModalAttendance());
    }

    return (
        <LessonsContainer>
            <CreateLesson>
                <CommonButton>Запланировать</CommonButton>
            </CreateLesson>
            <LessonsTableByGroup />
            <AttendanceLesson>
                <CommonButton onClick={openUpModalAttendance}>Посещаемость</CommonButton>
                <CommonButton>Обратная связь</CommonButton>
            </AttendanceLesson>
            { pageState.isOpenModalAttendance && <ModalAttendance />}
        </LessonsContainer>
    )
}

export default LessonsByGroup;
