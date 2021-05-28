import { CourseIdForCloneHW } from '../../../interfaces/CourseIdForCloneHW';
import {
  CLONE_HOMEWORK,
  GET_COURSES_FOR_CLONE_HW_MODAL,
} from '../../actionTypes';

export type CloneHomeworkModalActions =
  | ReturnType<typeof loadCourseForCloneHWModalWatcherAction>
  | ReturnType<typeof cloneHomeworkWatcherAction>;

export const loadCourseForCloneHWModalWatcherAction = () =>
  ({
    type: GET_COURSES_FOR_CLONE_HW_MODAL,
  } as const);

export const cloneHomeworkWatcherAction = (cloneHW: CourseIdForCloneHW) =>
  ({
    type: CLONE_HOMEWORK,
    payload: cloneHW,
  } as const);
