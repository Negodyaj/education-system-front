import { IRootState } from '..';

export const themeToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createThemeInputModel;

export const materialToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createMaterialInputModel;
