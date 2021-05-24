import { Course } from '../../interfaces/Courses';
import { Material } from '../../interfaces/Materials';
import { Themes } from '../../interfaces/Themes';
import {
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_MATERIALS_COURSE,
  COURSE_EDITION_CHANGE_DISPLAYING_BUTTON_OPEN_PROGRAM_COURSE,
  COURSE_EDITION_ALL_THEMES_IN_COURSE,
  COURSE_EDITION_WRETCH_GET_COURSE_BY_ID_LOADED,
  COURSE_EDITION_WRETCH_GET_THEMES_LOADED,
  COURSE_EDITION_WRETCH_GET_MATERIALS_LOADED,
  COURSE_EDITION_WRETCH_LOADING,
  COURSE_EDITION_WRETCH_FAIL,
  COURSE_EDITION_CURRENT_COURSE_ID,
  COURSE_EDITION_COURSE_BY_ID,
  COURSE_EDITION_ALL_THEMES,
  COURSE_EDITION_ALL_MATERIALS,
} from '../actionTypes';

export type CourseEditionActions =
  | ReturnType<typeof setCourseEditionIsLoadingAction>
  | ReturnType<typeof getAllThemes>
  | ReturnType<typeof getAllMaterials>
  | ReturnType<typeof setCourseEditionFailAction>
  | ReturnType<typeof getCourseByIdLoaded>
  | ReturnType<typeof setAllThemesInCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenProgramCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenMaterialsCourse>
  | ReturnType<typeof setIdCourse>
  | ReturnType<typeof getCourseById>
  | ReturnType<typeof getThemes>
  | ReturnType<typeof getMaterials>;

export const setCourseEditionIsLoadingAction = () =>
  ({
    type: COURSE_EDITION_WRETCH_LOADING,
    payload: undefined,
  } as const);

export const getAllThemes = (themes: Themes[]) =>
  ({
    type: COURSE_EDITION_WRETCH_GET_THEMES_LOADED,
    payload: themes,
  } as const);

export const getAllMaterials = (materials: Material[]) =>
  ({
    type: COURSE_EDITION_WRETCH_GET_MATERIALS_LOADED,
    payload: materials,
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

export const setIdCourse = (id: number) =>
  ({
    type: COURSE_EDITION_CURRENT_COURSE_ID,
    payload: id,
  } as const);

export const getCourseById = (id: number) =>
  ({
    type: COURSE_EDITION_COURSE_BY_ID,
    payload: id,
  } as const);

export const getThemes = () =>
  ({
    type: COURSE_EDITION_ALL_THEMES,
    payload: undefined,
  } as const);

export const getMaterials = () =>
  ({
    type: COURSE_EDITION_ALL_MATERIALS,
    payload: undefined,
  } as const);
