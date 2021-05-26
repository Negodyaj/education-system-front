import { Course } from '../../interfaces/Courses';
import { MaterialInput } from '../../interfaces/MaterialInput';
import { ThemeInput } from '../../interfaces/ThemeInput';
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
  isDataLoading: false,
  isDisplayingButtonOpenProgramCourse: false,
  isDisplayingButtonOpenMaterialsCourse: false,
  idCourse: 0,
  createThemeInputModel: INIT_THEME_TO_CREATE,
  createMaterialInputModel: INIT_MATERIAL_TO_CREATE,
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
    case CREATE_THEME:
      return { ...state, createThemeInputModel: action.payload };
    case CREATE_MATERIAL:
      return { ...state, createMaterialInputModel: action.payload };
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
    case COURSE_EDITION_CURRENT_COURSE_ID:
      return { ...state, idCourse: action.payload };
    default:
      return state;
  }
}
