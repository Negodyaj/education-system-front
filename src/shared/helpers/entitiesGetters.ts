import { useSelector } from 'react-redux';
import StateManager from 'react-select';

import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import { IRootState } from '../../store';

export type EntitiesGetter = () => DictionaryEntity[];

export const useGetGroupEntities = () =>
  useSelector((state: IRootState) => state.homeworkAppointModal.groupEntities);

export const useGroupsWithAttemptsForCurrentTeacher = () =>
  useSelector((state: IRootState) => state.homeworkAttempt.currentHomework);

export const useCoursesForHomeworkAddModal = () =>
  useSelector(
    (state: IRootState) => state.addHomeWorkModal.coursesForCloneEntities
  );

export const useGetThemesEntities = () =>
  useSelector((state: IRootState) => state.courseEditionPage.themes);
