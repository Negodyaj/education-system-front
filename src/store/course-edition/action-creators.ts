import { CourseMaterial } from '../../components/courses-page/course-edition/materials-course/MaterialsCourse';
import { Course } from '../../interfaces/Courses';
import { MaterialInput } from '../../interfaces/MaterialInput';
import { Material } from '../../interfaces/Materials';
import { ThemeInCourse } from '../../interfaces/ThemeInCourse';
import { ThemeInput } from '../../interfaces/ThemeInput';
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
  CREATE_THEME,
  CREATE_MATERIAL,
  SELECTED_MATERIAL,
  SELECTED_THEME,
  TOGGLE_MODAL_DELETE_THEME,
  TOGGLE_MODAL_DELETE_MATERIAL,
  DELETE_THEME,
  DELETE_MATERIAL,
  ADD_MATERIAL_IN_COURSE,
  DELETE_MATERIAL_FROM_COURSE,
  COURSE_EDITION_ALL_MATERIALS_IN_COURSE,
  CHANGE_ARR_THEMES_IN_COURSE,
  CHANGE_DISPLAYING_BUTTONS_TO_CHANGE_THEME_POSITION,
} from '../actionTypes';

export type CourseEditionActions =
  | ReturnType<typeof setCourseEditionIsLoadingAction>
  | ReturnType<typeof getAllThemes>
  | ReturnType<typeof getAllMaterials>
  | ReturnType<typeof setCourseEditionFailAction>
  | ReturnType<typeof getCourseByIdLoaded>
  | ReturnType<typeof setAllThemesInCourse>
  | ReturnType<typeof setAllMaterialsInCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenProgramCourse>
  | ReturnType<typeof setChangeDisplayingButtonOpenMaterialsCourse>
  | ReturnType<typeof setChangeDisplayingButtonsToChangeThemePosition>
  | ReturnType<typeof setIsOpenModalDeleteTheme>
  | ReturnType<typeof setIsOpenModalDeleteMaterial>
  | ReturnType<typeof setSelectedTheme>
  | ReturnType<typeof setSelectedMaterial>
  | ReturnType<typeof setIdCourse>
  | ReturnType<typeof getCourseById>
  | ReturnType<typeof getThemes>
  | ReturnType<typeof createTheme>
  | ReturnType<typeof deleteTheme>
  | ReturnType<typeof changeArrThemesInCourse>
  | ReturnType<typeof getMaterials>
  | ReturnType<typeof createMaterial>
  | ReturnType<typeof deleteMaterial>
  | ReturnType<typeof addMaterialInCourse>
  | ReturnType<typeof deleteMaterialFromCourse>;

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

export const setAllMaterialsInCourse = (idMaterialsCourse: number[]) =>
  ({
    type: COURSE_EDITION_ALL_MATERIALS_IN_COURSE,
    payload: idMaterialsCourse,
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

export const setChangeDisplayingButtonsToChangeThemePosition = () =>
  ({
    type: CHANGE_DISPLAYING_BUTTONS_TO_CHANGE_THEME_POSITION,
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

export const createTheme = (newTheme: ThemeInput) =>
  ({
    type: CREATE_THEME,
    payload: newTheme,
  } as const);

export const deleteTheme = () =>
  ({
    type: DELETE_THEME,
    payload: undefined,
  } as const);

export const changeArrThemesInCourse = (arrThemesInCourse: ThemeInCourse[]) =>
  ({
    type: CHANGE_ARR_THEMES_IN_COURSE,
    payload: arrThemesInCourse,
  } as const);

export const getMaterials = () =>
  ({
    type: COURSE_EDITION_ALL_MATERIALS,
    payload: undefined,
  } as const);

export const createMaterial = (newMaterial: MaterialInput) =>
  ({
    type: CREATE_MATERIAL,
    payload: newMaterial,
  } as const);

export const deleteMaterial = () =>
  ({
    type: DELETE_MATERIAL,
    payload: undefined,
  } as const);

export const addMaterialInCourse = (data: CourseMaterial) =>
  ({
    type: ADD_MATERIAL_IN_COURSE,
    payload: data,
  } as const);

export const deleteMaterialFromCourse = (data: CourseMaterial) =>
  ({
    type: DELETE_MATERIAL_FROM_COURSE,
    payload: data,
  } as const);

export const setIsOpenModalDeleteTheme = () =>
  ({
    type: TOGGLE_MODAL_DELETE_THEME,
    payload: undefined,
  } as const);

export const setIsOpenModalDeleteMaterial = () =>
  ({
    type: TOGGLE_MODAL_DELETE_MATERIAL,
    payload: undefined,
  } as const);

export const setSelectedMaterial = (material: Material) =>
  ({
    type: SELECTED_MATERIAL,
    payload: material,
  } as const);

export const setSelectedTheme = (theme: Themes) =>
  ({
    type: SELECTED_THEME,
    payload: theme,
  } as const);
