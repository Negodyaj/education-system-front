import { IRootState } from '..';

export const currentCourseSelector = (state: IRootState) =>
  state.courseEditionPage.course;

export const themeToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createThemeInputModel;

export const dataForChangeArrThemesInCourseSelector = (state: IRootState) =>
  state.courseEditionPage.dataForChangeArrThemesInCourse;

export const idMaterialsInCourseSelector = (state: IRootState) =>
  state.courseEditionPage.idMaterialsCourse;

export const materialToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createMaterialInputModel;

export const themeToSelectSelector = (state: IRootState) =>
  state.courseEditionPage.currentTheme.id;

export const materialToSelectSelector = (state: IRootState) =>
  state.courseEditionPage.currentMaterial.id;

export const dataForAddMaterialInCourseToSelectSelector = (state: IRootState) =>
  state.courseEditionPage.dataForAddMaterialInCourse;

export const dataForDeleteMaterialFromCourseToSelectSelector = (
  state: IRootState
) => state.courseEditionPage.dataForDeleteMaterialFromCourse;
