import { CourseMaterial } from '../../components/courses-page/course-edition/materials-course/MaterialsCourse';
import { Course } from '../../interfaces/Courses';
import { MaterialInput } from '../../interfaces/MaterialInput';
import { Material } from '../../interfaces/Materials';
import { ThemeInput } from '../../interfaces/ThemeInput';
import { Themes } from '../../interfaces/Themes';
import {
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE,
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE,
  COURSE_EDITION_ALL_THEMES_IN_COURSE,
  COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED,
  COURSE_EDITION_WRETCH_GET_THEMES_LOADED,
  COURSE_EDITION_WRETCH_LOADING,
  COURSE_EDITION_WRETCH_FAIL,
  COURSE_EDITION_CURRENT_COURSE_ID,
  COURSE_EDITION_WRETCH_GET_MATERIALS_LOADED,
  CREATE_THEME,
  CREATE_MATERIAL,
  SELECTED_MATERIAL,
  SELECTED_THEME,
  TOGGLE_MODAL_DELETE_THEME,
  TOGGLE_MODAL_DELETE_MATERIAL,
  ADD_MATERIAL_IN_COURSE,
  DELETE_MATERIAL_FROM_COURSE,
  COURSE_EDITION_ALL_MATERIALS_IN_COURSE,
  CHANGE_ARR_THEMES_IN_COURSE,
  CHANGE_DISPLAYING_BUTTONS_TO_CHANGE_THEME_POSITION,
} from '../actionTypes';
import { ICourseEditionState } from '../state';

import { CourseEditionActions } from './action-creators';

export const INIT_THEME_TO_CREATE: ThemeInput = {
  name: '',
  tagIds: [],
};

export const INIT_MATERIAL_TO_CREATE: MaterialInput = {
  link: '',
  description: '',
};

const initialState: ICourseEditionState = {
  course: {} as Course,
  themes: [],
  materials: [],
  idThemesCourse: [],
  idMaterialsCourse: [],
  isDataLoading: false,
  isDisplayingButtonOpenProgramCourse: false,
  isDisplayingButtonOpenMaterialsCourse: false,
  isDisplayingButtonsToChangeThemePosition: false,
  isOpenModalDeleteTheme: false,
  isOpenModalDeleteMaterial: false,
  idCourse: 0,
  currentTheme: {} as Themes,
  currentMaterial: {} as Material,
  createThemeInputModel: INIT_THEME_TO_CREATE,
  createMaterialInputModel: INIT_MATERIAL_TO_CREATE,
  dataForAddMaterialInCourse: {} as CourseMaterial,
  dataForDeleteMaterialFromCourse: {} as CourseMaterial,
  dataForChangeArrThemesInCourse: [],
};

export function courseEditionPageReducer(
  state: ICourseEditionState = initialState,
  action: CourseEditionActions
): ICourseEditionState {
  switch (action.type) {
    case COURSE_EDITION_WRETCH_LOADING:
      return { ...state, isDataLoading: true };
    case COURSE_EDITION_WRETCH_GET_THEMES_LOADED:
      return { ...state, themes: action.payload, isDataLoading: false };
    case COURSE_EDITION_WRETCH_GET_MATERIALS_LOADED:
      return { ...state, materials: action.payload, isDataLoading: false };
    case COURSE_EDITION_WRETCH_FAIL:
      return { ...state, isDataLoading: false };
    case COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED:
      return { ...state, course: action.payload };
    case COURSE_EDITION_ALL_THEMES_IN_COURSE:
      return { ...state, idThemesCourse: action.payload };
    case COURSE_EDITION_ALL_MATERIALS_IN_COURSE:
      return { ...state, idMaterialsCourse: action.payload };
    case CREATE_THEME:
      return { ...state, createThemeInputModel: action.payload };
    case CHANGE_ARR_THEMES_IN_COURSE:
      return { ...state, dataForChangeArrThemesInCourse: action.payload };
    case CREATE_MATERIAL:
      return { ...state, createMaterialInputModel: action.payload };
    case ADD_MATERIAL_IN_COURSE:
      return { ...state, dataForAddMaterialInCourse: action.payload };
    case DELETE_MATERIAL_FROM_COURSE:
      return { ...state, dataForDeleteMaterialFromCourse: action.payload };
    case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE:
      return {
        ...state,
        isDisplayingButtonOpenProgramCourse: !state.isDisplayingButtonOpenProgramCourse,
      };
    case COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE:
      return {
        ...state,
        isDisplayingButtonOpenMaterialsCourse: !state.isDisplayingButtonOpenMaterialsCourse,
      };
    case CHANGE_DISPLAYING_BUTTONS_TO_CHANGE_THEME_POSITION:
      return {
        ...state,
        isDisplayingButtonsToChangeThemePosition: !state.isDisplayingButtonsToChangeThemePosition,
      };
    case TOGGLE_MODAL_DELETE_THEME:
      return {
        ...state,
        isOpenModalDeleteTheme: !state.isOpenModalDeleteTheme,
      };
    case TOGGLE_MODAL_DELETE_MATERIAL:
      return {
        ...state,
        isOpenModalDeleteMaterial: !state.isOpenModalDeleteMaterial,
      };
    case SELECTED_THEME:
      return { ...state, currentTheme: action.payload };
    case SELECTED_MATERIAL:
      return { ...state, currentMaterial: action.payload };
    case COURSE_EDITION_CURRENT_COURSE_ID:
      return { ...state, idCourse: action.payload };
    default:
      return state;
  }
}
