import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  setSelectedLessonId,
  setIsOpenModalDeleteLesson,
} from '../../../store/group-page/lesson/action-creators';
import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';

import ModalLessonDelete from './ModalLessonDelete';
import {
  ButtonActions,
  ColumnLessonsTable,
  ContentColumnLessonsTable,
  HeaderColumnLessonsTable,
  HeaderLessonsTable,
  LessonsTable,
  RoundButton,
} from './LessonsTableByGroupStyled';

function LessonsTableByGroup() {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.lessonByGroup);

  useEffect(() => {
    dispatch(getLessonsByGroup());
  }, []);

  const openModalDeleteLesson = (lessonId: number) => {
    dispatch(setIsOpenModalDeleteLesson());
    dispatch(setSelectedLessonId(lessonId));
  };

  const rememberLessonId = (lessonId: number) => {
    dispatch(setSelectedLessonId(lessonId));
  };

  return (
    <LessonsTable>
      <HeaderLessonsTable>
        <HeaderColumnLessonsTable>Дата</HeaderColumnLessonsTable>
        <HeaderColumnLessonsTable>Описание</HeaderColumnLessonsTable>
        <HeaderColumnLessonsTable>Список тем</HeaderColumnLessonsTable>
        <HeaderColumnLessonsTable>Ссылка на запись</HeaderColumnLessonsTable>
        <HeaderColumnLessonsTable>Действия</HeaderColumnLessonsTable>
      </HeaderLessonsTable>
      {pageState.lessonList.map((lesson) => (
        <ContentColumnLessonsTable
          onClick={() => {
            rememberLessonId(lesson.id);
          }}>
          <ColumnLessonsTable>{lesson.lessonDate}</ColumnLessonsTable>
          <ColumnLessonsTable>{lesson.description}</ColumnLessonsTable>
          <ColumnLessonsTable>{lesson.themes}</ColumnLessonsTable>
          <ColumnLessonsTable>{lesson.recordLink}</ColumnLessonsTable>
          <ColumnLessonsTable>
            <ButtonActions>
              {new Date(
                `${lesson.lessonDate.substr(6, 4)}-${lesson.lessonDate.substr(
                  3,
                  2
                )}-${lesson.lessonDate.substr(0, 2)}`
              ) > currentDate ? (
                <RoundButton
                  onClick={() => {
                    openModalDeleteLesson(lesson.id);
                  }}>
                  <FontAwesomeIcon icon="trash" />
                </RoundButton>
              ) : (
                <div />
              )}
              <RoundButton>
                <FontAwesomeIcon icon="edit" />
              </RoundButton>
            </ButtonActions>
          </ColumnLessonsTable>
        </ContentColumnLessonsTable>
      ))}
      {pageState.isOpenModalDeleteLesson && <ModalLessonDelete />}
    </LessonsTable>
  );
}

export default LessonsTableByGroup;
