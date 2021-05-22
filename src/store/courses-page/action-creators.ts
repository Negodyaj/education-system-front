import { CourseInput } from '../../interfaces/CourseInput';
import { Course } from '../../interfaces/Courses';
import {
  COURSE_LIST_WRETCH_LOADING,
  COURSE_LIST_WRETCH_LOADED,
  COURSE_LIST_WRETCH_FAIL,
  COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE,
  COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE,
  GET_COURSES_WATCHER,
  DELETE_COURSE_WATCHER,
  COURSE_ID_DELETE,
  CREATE_COURSE_WATCHER,
} from '../actionTypes';

export type CoursePageActions =
  | ReturnType<typeof setCoursesListIsLoadingAction>
  | ReturnType<typeof setCoursesListWasLoadedAction>
  | ReturnType<typeof setCoursesListFail>
  | ReturnType<typeof showToggleModalCreateCourseAction>
  | ReturnType<typeof showToggleModalDeleteCourseAction>
  | ReturnType<typeof createCourse>
  | ReturnType<typeof getCourses>
  | ReturnType<typeof deleteCourse>
  | ReturnType<typeof courseIdForDelete>;

export const setCoursesListIsLoadingAction = () =>
  ({
    type: COURSE_LIST_WRETCH_LOADING,
    payload: undefined,
  } as const);

export const setCoursesListWasLoadedAction = (courses: Course[]) =>
  ({
    type: COURSE_LIST_WRETCH_LOADED,
    payload: courses,
  } as const);

export const setCoursesListFail = (error: string) =>
  ({
    type: COURSE_LIST_WRETCH_FAIL,
    payload: error,
  } as const);

export const showToggleModalCreateCourseAction = () =>
  ({
    type: COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE,
    payload: true,
  } as const);

export const showToggleModalDeleteCourseAction = () =>
  ({
    type: COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE,
    payload: undefined,
  } as const);

export const createCourse = (newCourse: CourseInput) =>
  ({
    type: CREATE_COURSE_WATCHER,
    payload: newCourse,
  } as const);

export const getCourses = () =>
  ({
    type: GET_COURSES_WATCHER,
    payload: undefined,
  } as const);

export const courseIdForDelete = (id: number) =>
  ({
    type: COURSE_ID_DELETE,
    payload: id,
  } as const);

export const deleteCourse = () =>
  ({
    type: DELETE_COURSE_WATCHER,
    payload: undefined,
  } as const);
