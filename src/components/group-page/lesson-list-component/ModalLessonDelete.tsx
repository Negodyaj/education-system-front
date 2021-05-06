import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setIsOpenModalDeleteLesson } from '../../../store/group-page/lesson/action-creators';
import { deleteLesson } from '../../../store/group-page/lesson/thunk';
import { ButtonCloseModalDeleteLesson, CommonButton, ModalBackDeleteLesson, ModalBottomDeleteLesson, ModalContentDeleteLesson, ModalDeleteLesson, ModalHeaderDeleteLesson, RoundButton } from './ModalLessonDeleteStyled';

const ModalLessonDelete = () => {
    const dispatch = useDispatch();
    const deleteLessonId = useSelector((state: IRootState) => state.lessonByGroup.idLessonForDelete);

    const closeModalDeleteLesson = () => {
        dispatch(setIsOpenModalDeleteLesson());
    }

    const deleteLessonById = () => {
        dispatch(deleteLesson(deleteLessonId));
    } 

    return (
        <ModalBackDeleteLesson>
            <ModalDeleteLesson>
                <ModalHeaderDeleteLesson>
                    <ButtonCloseModalDeleteLesson onClick={closeModalDeleteLesson}>
                        <FontAwesomeIcon icon='times'/>
                    </ButtonCloseModalDeleteLesson>
                </ModalHeaderDeleteLesson>
                <ModalContentDeleteLesson>Вы уверены, что хотите удалить данное занятие?</ModalContentDeleteLesson>
                <ModalBottomDeleteLesson>
                    <CommonButton onClick={closeModalDeleteLesson}>Отмена</CommonButton>
                    <CommonButton onClick={deleteLessonById}>Да</CommonButton>
                </ModalBottomDeleteLesson>
            </ModalDeleteLesson>
        </ModalBackDeleteLesson>
    )
}

export default ModalLessonDelete;