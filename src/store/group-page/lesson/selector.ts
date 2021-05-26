import { IRootState } from '../..';

export const lessonToCreateSelector = (state: IRootState) =>
  state.lessonByGroup.createLessonInputModel;

export const lessonToUpdateSelector = (state: IRootState) =>
  state.lessonByGroup.updateLessonInputModel;

export const lessonToSelectSelector = (state: IRootState) =>
  state.lessonByGroup.currentLesson.lessonId;

export const attendancesToCreateSelector = (state: IRootState) =>
  state.lessonByGroup.arrDataToCreateAttendances;
