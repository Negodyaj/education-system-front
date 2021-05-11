import { Lesson } from '../../../interfaces/Lesson';
import {
  LESSON_ID_FOR_DELETE_LESSON,
  LESSON_LIST_WRETCH_FAIL,
  LESSON_LIST_WRETCH_LOADED,
  LESSON_LIST_WRETCH_LOADING,
  LESSON_TOGGLE_MODAL_ADD_LESSON,
  LESSON_TOGGLE_MODAL_ATTENDANCE,
  LESSON_TOGGLE_MODAL_DELETE_LESSON,
} from '../../actionTypes';

export type LessonListActions =
  | ReturnType<typeof setLessonListIsLoading>
  | ReturnType<typeof setLessonListWasLoaded>
  | ReturnType<typeof setLessonListFail>
  | ReturnType<typeof setIsOpenModalAttendance>
  | ReturnType<typeof setIsOpenModalAddLesson>
  | ReturnType<typeof setIsOpenModalDeleteLesson>
  | ReturnType<typeof setIdLessonForDelete>;

export const setLessonListIsLoading = () =>
  ({
    type: LESSON_LIST_WRETCH_LOADING,
    payload: undefined,
  } as const);
export const setLessonListWasLoaded = (lessons: Lesson[]) =>
  ({
    type: LESSON_LIST_WRETCH_LOADED,
    payload: lessons,
  } as const);

export const setLessonListFail = (error: string) =>
  ({
    type: LESSON_LIST_WRETCH_FAIL,
    payload: error,
  } as const);

export const setIsOpenModalAttendance = () =>
  ({
    type: LESSON_TOGGLE_MODAL_ATTENDANCE,
    payload: undefined,
  } as const);

export const setIsOpenModalAddLesson = () =>
  ({
    type: LESSON_TOGGLE_MODAL_ADD_LESSON,
    payload: undefined,
  } as const);

export const setIsOpenModalDeleteLesson = () =>
  ({
    type: LESSON_TOGGLE_MODAL_DELETE_LESSON,
    payload: undefined,
  } as const);

export const setIdLessonForDelete = (lessonId: number) =>
  ({
    type: LESSON_ID_FOR_DELETE_LESSON,
    payload: lessonId,
  } as const);
