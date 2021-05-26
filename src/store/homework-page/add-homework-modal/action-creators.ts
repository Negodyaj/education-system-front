import { Course } from '../../../interfaces/Courses';
import { Homework } from '../../../interfaces/Homework';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import { Tag } from '../../../interfaces/Tag';
import {
  ADD_HOMEWORK_OR_MODAL,
  COURSES_LOAD_FOR_HW_MODAL_SUCCESS,
  GET_COURSES_FOR_HW_MODAL,
  GET_HOMEWORKS_FOR_MODAL,
  GET_TAGS_FOR_HW_MODAL,
  HOMEWORK_ADDED_SUCCESS,
  HOMEWORK_LOAD_FOR_MODAL_SUCCESS,
} from '../../actionTypes';

export type AddHomeworkModalActions =
  | ReturnType<typeof addedHomeworkSuccess>
  | ReturnType<typeof loadHomeworkForModalSuccess>
  | ReturnType<typeof loadCourseForHWModalSuccess>
  | ReturnType<typeof addHomeworkForModalWatcherAction>;

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
export const loadHomeworkForModalWatcherAction = () =>
  ({
    type: GET_HOMEWORKS_FOR_MODAL,
    payload: undefined,
  } as const);
export const addHomeworkForModalWatcherAction = (newHomework: HomeworkInput) =>
  ({
    type: ADD_HOMEWORK_OR_MODAL,
    payload: newHomework,
  } as const);
export const loadCourseForHWModalWatcherAction = (corsesList: Course[]) =>
  ({
    type: GET_COURSES_FOR_HW_MODAL,
    payload: corsesList,
  } as const);
export const loadTagsForHWModalWatcherAction = (tagList: Tag[]) =>
  ({
    type: GET_TAGS_FOR_HW_MODAL,
    payload: tagList,
  } as const);
