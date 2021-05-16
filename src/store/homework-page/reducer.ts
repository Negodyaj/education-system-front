import { faClone } from '@fortawesome/free-solid-svg-icons';

import { HomeworkPageOptions } from '../../components/homework-page/HomeworkPageCore';
import { Role } from '../../enums/role';
import { convertHomeworkListForMethodistMode } from '../../shared/converters/homeworkListForMethodistMode';
import { convertHomeworkListForTeacherMode } from '../../shared/converters/homeworkListForTeacherMode';
import {
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';
import { IHomeworkPageState } from '../state';

import { HomeworkPageActions } from './action-creators';

const METHODIST_VIEW: HomeworkPageOptions = {
  addButton: true,
  homeworkSelector: Role.Methodist,
  homeworkList: {},
  homeworkButtonsCell: {
    cloneButton: true,
    deleteButton: true,
    editButton: true,
  },
};
const TEACHER_VIEW: HomeworkPageOptions = {
  addButton: false,
  homeworkSelector: Role.Teacher,
  homeworkList: {},
  homeworkButtonsCell: {
    appointButton: true,
    cancelAttemptButton: true,
    checkButton: true,
  },
};
const STUDENT_VIEW: HomeworkPageOptions = {
  addButton: false,
  homeworkSelector: Role.Student,
  homeworkList: {},
  homeworkButtonsCell: {
    attemptButton: true,
  },
};
const initialState: IHomeworkPageState = {
  homeworkListDefault: [],
  openedItemSetsNames: [],
  pageOptionsByRole: {
    [Role[Role.Methodist]]: METHODIST_VIEW,
    [Role[Role.Teacher]]: TEACHER_VIEW,
    [Role[Role.Student]]: STUDENT_VIEW,
  },
};

export function homeworkPageReducer(
  state: IHomeworkPageState = initialState,
  action: HomeworkPageActions
): IHomeworkPageState {
  switch (action.type) {
    case HOMEWORK_LOAD_SUCCESS:
      if (action.payload.currentUserRoleId === Role.Methodist) {
        METHODIST_VIEW.homeworkList = {
          ...convertHomeworkListForMethodistMode(action.payload.payload),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Teacher) {
        TEACHER_VIEW.homeworkList = {
          ...convertHomeworkListForTeacherMode(action.payload.payload),
        };

        return { ...state };
      }

      STUDENT_VIEW.homeworkList = {
        'Frontend 09.07.2021': convertHomeworkListForTeacherMode(
          action.payload.payload
        )['Frontend 09.07.2021'],
      };

      return { ...state };

    case HOMEWORK_DELETE_PENDING:
      return {
        ...state,
        homeworkListDefault: [
          ...state.homeworkListDefault.filter((hw) => hw.id !== action.payload),
        ],
      };
    case ITEMS_SET_OPEN:
      state.openedItemSetsNames.includes(action.payload)
        ? state.openedItemSetsNames.splice(
            state.openedItemSetsNames.indexOf(action.payload),
            1
          )
        : state.openedItemSetsNames.push(action.payload);

      return { ...state };
    default:
      return state;
  }
}
