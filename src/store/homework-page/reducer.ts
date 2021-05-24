import { HomeworkPageOptions } from '../../components/homework-page/HomeworkPageCore';
import { Role } from '../../enums/role';
import { convertHomeworkListForMethodistMode } from '../../shared/converters/homeworkListForMethodistMode';
import { convertHomeworkListForStudentMode } from '../../shared/converters/homeworkListForStudentMode';
import { convertHomeworkListForTeacherMode } from '../../shared/converters/homeworkListForTeacherMode';
import {
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';
import { IHomeworkPageState } from '../state';

import { HomeworkPageActions } from './action-creators';

export enum HWListTypes {
  Proposed = 'proposed',
  Appointed = 'appointed',
}

const METHODIST_VIEW: HomeworkPageOptions = {
  addButton: true,
  homeworkList: {},
  homeworkButtonsCell: {
    [HWListTypes.Proposed]: {
      cloneButton: true,
      deleteButton: true,
      editButton: true,
    },
  },
};
const TEACHER_VIEW: HomeworkPageOptions = {
  addButton: false,
  homeworkList: {},
  homeworkButtonsCell: {
    [HWListTypes.Proposed]: {
      appointButton: true,
    },
    [HWListTypes.Appointed]: {
      checkButton: true,
    },
  },
};
const TUTOR_VIEW: HomeworkPageOptions = {
  ...TEACHER_VIEW,
  homeworkList: {},
  homeworkButtonsCell: {
    [HWListTypes.Appointed]: {
      checkButton: true,
    },
  },
};
const STUDENT_VIEW: HomeworkPageOptions = {
  addButton: false,
  homeworkList: {},
  homeworkButtonsCell: {
    [HWListTypes.Appointed]: {
      attemptButton: true,
    },
  },
};
const initialState: IHomeworkPageState = {
  homeworkListDefault: [],
  openedItemSetsNames: [],
  pageOptionsByRole: {
    [Role[Role.Methodist]]: METHODIST_VIEW,
    [Role[Role.Teacher]]: TEACHER_VIEW,
    [Role[Role.Student]]: STUDENT_VIEW,
    [Role[Role.Tutor]]: TUTOR_VIEW,
  },
};

export function homeworkPageReducer(
  state: IHomeworkPageState = initialState,
  action: HomeworkPageActions
): IHomeworkPageState {
  switch (action.type) {
    case HOMEWORK_LOAD_SUCCESS:
      state.homeworkListDefault = action.payload.homeworks;

      if (action.payload.currentUserRoleId === Role.Methodist) {
        METHODIST_VIEW.homeworkList[HWListTypes.Proposed] = {
          ...convertHomeworkListForMethodistMode(state.homeworkListDefault),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Teacher) {
        TEACHER_VIEW.homeworkList[HWListTypes.Proposed] = {
          ...convertHomeworkListForMethodistMode(state.homeworkListDefault),
        };
        TEACHER_VIEW.homeworkList[HWListTypes.Appointed] = {
          ...convertHomeworkListForTeacherMode(state.homeworkListDefault),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Tutor) {
        TUTOR_VIEW.homeworkList[HWListTypes.Appointed] = {
          ...convertHomeworkListForTeacherMode(state.homeworkListDefault),
        };

        return { ...state };
      }

      console.log(convertHomeworkListForStudentMode(action.payload.homeworks));
      STUDENT_VIEW.homeworkList[HWListTypes.Appointed] = {
        ...convertHomeworkListForStudentMode(action.payload.homeworks),
      };

      return { ...state };

    case HOMEWORK_DELETE_PENDING:
      return {
        ...state,
        homeworkListDefault: [...state.homeworkListDefault].filter(
          (hw) => hw.id !== action.payload
        ),
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
