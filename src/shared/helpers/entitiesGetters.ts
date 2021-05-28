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
  useSelector((state: IRootState) => state.addHomeWorkModal.coursesEntities);
export const useCoursesForHomeworkCloneModal = () => {
  const appState = useSelector((state: IRootState) => state);
  const tmpCourseId = appState.cloneHomeWorkModal.homeworkForUpdate.courseId;
  console.log(appState.cloneHomeWorkModal.homeworkForUpdate);

  return appState.addHomeWorkModal.coursesEntities.filter(
    (course) => course.id !== tmpCourseId
  );
};
export const useTagsForHomeworkAddModal = () =>
  useSelector(
    (state: IRootState) => state.addHomeWorkModal.tagsForHomeworkEntities
  );
export const useThemesForHomeworkAddModal = () =>
  useSelector(
    (state: IRootState) => state.addHomeWorkModal.themesForHomeworkEntities
  );

export const useGetThemesEntities = () =>
  useSelector((state: IRootState) => state.courseEditionPage.themes);

export const useContractNumberForUser = () =>
  useSelector(
    (state: IRootState) => state.payment.userForPayment?.contractNumber
  );

export const useGetTagsEntities = () =>
  useSelector((state: IRootState) => state.tagsPage.tagList);
