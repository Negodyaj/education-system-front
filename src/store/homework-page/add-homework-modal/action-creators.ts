import { Course } from '../../../interfaces/Courses';
import { Homework } from '../../../interfaces/Homework';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import {
  COURSES_LOAD_FOR_HW_MODAL_SUCCESS,
  HOMEWORK_ADDED_SUCCESS,
  HOMEWORK_LOAD_FOR_MODAL_SUCCESS,
} from '../../actionTypes';

export type AddHomeworkModalActions =
  | ReturnType<typeof addedHomeworkSuccess>
  | ReturnType<typeof loadHomeworkForModalSuccess>
  | ReturnType<typeof loadCourseForHWModalSuccess>;

export const loadHomeworkForModalSuccess = (homeworkList: Homework[]) =>
  ({
    type: HOMEWORK_LOAD_FOR_MODAL_SUCCESS,
    payload: homeworkList,
  } as const);

export const addedHomeworkSuccess = (newHomework: HomeworkInput) =>
  ({
    type: HOMEWORK_ADDED_SUCCESS,
    payload: newHomework,
  } as const);

export const loadCourseForHWModalSuccess = (corsesList: Course[]) => ({
  type: COURSES_LOAD_FOR_HW_MODAL_SUCCESS,
  payload: corsesList,
});
// export const addHomeworkForModalWatcherAction =
