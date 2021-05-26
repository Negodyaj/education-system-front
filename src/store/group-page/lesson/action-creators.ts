import { CurrentLesson } from '../../../components/group-page/lesson-list-component/lesson-list-table/LessonsTableByGroup';
import { IUserAttendance } from '../../../components/group-page/lesson-list-component/modal-attendance/ModalAttendance';
import { Lesson } from '../../../interfaces/Lesson';
import { LessonInput } from '../../../interfaces/LessonInput';
import { LessonUpdate } from '../../../interfaces/LessonUpdate';
import {
  SELECTED_LESSON,
  LESSON_LIST_WRETCH_FAIL,
  LESSON_LIST_WRETCH_LOADED,
  LESSON_LIST_WRETCH_LOADING,
  LESSON_TOGGLE_MODAL_ADD_LESSON,
  LESSON_TOGGLE_MODAL_ATTENDANCE,
  LESSON_TOGGLE_MODAL_DELETE_LESSON,
  DATA_TO_CREATE_ATTENDANCES,
  LESSON_BY_GROUP_ID,
  CREATE_LESSON,
  DELETE_LESSON,
  CREATE_ATTENDANCES,
  UPDATE_LESSON,
} from '../../actionTypes';

export type LessonListActions =
  | ReturnType<typeof setLessonListIsLoading>
  | ReturnType<typeof setLessonListWasLoaded>
  | ReturnType<typeof setLessonListFail>
  | ReturnType<typeof setIsOpenModalAttendance>
  | ReturnType<typeof setIsOpenModalAddLesson>
  | ReturnType<typeof setIsOpenModalDeleteLesson>
  | ReturnType<typeof setSelectedLesson>
  | ReturnType<typeof setDataToCreateAttendances>
  | ReturnType<typeof getLessonsByGroup>
  | ReturnType<typeof createLesson>
  | ReturnType<typeof updateLesson>
  | ReturnType<typeof deleteLesson>
  | ReturnType<typeof createAttendances>;

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

export const setSelectedLesson = (lesson: CurrentLesson) =>
  ({
    type: SELECTED_LESSON,
    payload: lesson,
  } as const);

export const setDataToCreateAttendances = (arrData: IUserAttendance[]) =>
  ({
    type: DATA_TO_CREATE_ATTENDANCES,
    payload: arrData,
  } as const);

export const getLessonsByGroup = () =>
  ({
    type: LESSON_BY_GROUP_ID,
    payload: undefined,
  } as const);

export const createLesson = (newLesson: LessonInput) =>
  ({
    type: CREATE_LESSON,
    payload: newLesson,
  } as const);

export const updateLesson = (dataLesson: LessonUpdate) =>
  ({
    type: UPDATE_LESSON,
    payload: dataLesson,
  } as const);

export const deleteLesson = () =>
  ({
    type: DELETE_LESSON,
    payload: undefined,
  } as const);

export const createAttendances = () =>
  ({
    type: CREATE_ATTENDANCES,
    payload: undefined,
  } as const);
