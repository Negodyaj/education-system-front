import { Course } from '../../interfaces/Courses';
import { Themes } from '../../interfaces/Themes';
import {
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE,
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE,
  COURSE_EDITION_ALL_THEMES_IN_COURSE,
  COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED,
  COURSE_EDITION_WRETCH_LOADED,
  COURSE_EDITION_WRETCH_LOADING,
  COURSE_EDITION_WRETCH_FAIL,
} from '../actionTypes';

export type CourseEditionActions =
  | ReturnType<typeof setCourseEditionIsLoadingAction>
  | ReturnType<typeof setCourseEditionWasLoadedAction>
  | ReturnType<typeof setCourseEditionFailAction>
  | ReturnType<typeof getCourseByIdLoaded>
  | ReturnType<typeof setAllThemesInCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenProgramCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenMaterialsCourse>;

export const setCourseEditionIsLoadingAction = () =>
  ({
    type: COURSE_EDITION_WRETCH_LOADING,
    payload: undefined,
  } as const);

export const setCourseEditionWasLoadedAction = (themes: Themes[]) =>
  ({
    type: COURSE_EDITION_WRETCH_LOADED,
    payload: themes,
  } as const);

export const setCourseEditionFailAction = (error: string) =>
  ({
    type: COURSE_EDITION_WRETCH_FAIL,
    payload: error,
  } as const);

export const getCourseByIdLoaded = (course: Course) =>
  ({
    type: COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED,
    payload: course,
  } as const);

export const setAllThemesInCourse = (idThemesCourse: number[]) =>
  ({
    type: COURSE_EDITION_ALL_THEMES_IN_COURSE,
    payload: idThemesCourse,
  } as const);

export const setChangeDisplayingButtonOpenProgramCourse = () =>
  ({
    type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE,
    payload: undefined,
  } as const);

export const setChangeDisplayingButtonOpenMaterialsCourse = () =>
  ({
    type: COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE,
    payload: undefined,
  } as const);
