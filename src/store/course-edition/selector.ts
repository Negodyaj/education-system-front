import { IRootState } from '..';

export const themeToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createThemeInputModel;

export const materialToCreateSelector = (state: IRootState) =>
  state.courseEditionPage.createMaterialInputModel;

export const themeToSelectSelector = (state: IRootState) =>
  state.courseEditionPage.currentTheme.id;

export const materialToSelectSelector = (state: IRootState) =>
  state.courseEditionPage.currentMaterial.id;
