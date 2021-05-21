import { IRootState } from '..';

export const courseToDeleteSelector = (state: IRootState) =>
  state.coursePage.idCourseForDelete;
