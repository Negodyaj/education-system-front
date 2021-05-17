import { LessonInput } from '../../../interfaces/LessonInput';
import {
  SELECTED_LESSON_ID,
  LESSON_LIST_WRETCH_FAIL,
  LESSON_LIST_WRETCH_LOADED,
  LESSON_LIST_WRETCH_LOADING,
  LESSON_TOGGLE_MODAL_ADD_LESSON,
  LESSON_TOGGLE_MODAL_ATTENDANCE,
  LESSON_TOGGLE_MODAL_DELETE_LESSON,
} from '../../actionTypes';
import { ILesson } from '../../state';

import { LessonListActions } from './action-creators';

export const INIT_LESSON_TO_CREATE: LessonInput = {
  description: '',
  lessonDate: '',
  themesId: [],
};

/* export const INIT_LESSON_TO_UPDATE: LessonUpdate = {
    description: '',
    lessonDate: '',
    themesId: [],
    recordLink: ''
} */

const initialState: ILesson = {
  lessonList: [],
  isDataLoading: false,
  isOpenModalAttendance: false,
  isOpenModalAddLesson: false,
  isOpenModalDeleteLesson: false,
  idSelectedLesson: 0,
  createLessonInputModel: INIT_LESSON_TO_CREATE,
};

export function lessonByGroupReducer(
  state: ILesson = initialState,
  action: LessonListActions
): ILesson {
  switch (action.type) {
    case LESSON_LIST_WRETCH_LOADING:
      return { ...state, isDataLoading: true };
    case LESSON_LIST_WRETCH_LOADED:
      return { ...state, lessonList: action.payload, isDataLoading: false };
    case LESSON_LIST_WRETCH_FAIL:
      return { ...state, lessonList: [], isDataLoading: false };
    case LESSON_TOGGLE_MODAL_ATTENDANCE:
      return { ...state, isOpenModalAttendance: !state.isOpenModalAttendance };
    case LESSON_TOGGLE_MODAL_ADD_LESSON:
      return { ...state, isOpenModalAddLesson: !state.isOpenModalAddLesson };
    case LESSON_TOGGLE_MODAL_DELETE_LESSON:
      return {
        ...state,
        isOpenModalDeleteLesson: !state.isOpenModalDeleteLesson,
      };
    case SELECTED_LESSON_ID:
      return { ...state, idSelectedLesson: action.payload };
    default:
      return state;
  }
}
