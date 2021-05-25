import { IRootState } from '..';

export const courseToDeleteSelector = (state: IRootState) =>
  state.coursePage.idCourseForDelete;

export const courseToCreateSelector = (state: IRootState) =>
  state.coursePage.createCourseInputModel;
