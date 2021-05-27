import { Course } from '../../../interfaces/Courses';
import { GET_COURSES_FOR_CLONE_HW_MODAL } from '../../actionTypes';

export type CloneHomeworkModalActions = ReturnType<
  typeof loadCourseForCloneHWModalWatcherAction
>;

export const loadCourseForCloneHWModalWatcherAction = () =>
  ({
    type: GET_COURSES_FOR_CLONE_HW_MODAL,
  } as const);
