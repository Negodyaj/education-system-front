import { HomeworkPageOptions } from '../../components/homework-page/HomeworkPageCore';
import { Role } from '../../enums/role';
import { convertHomeworkListToProposed } from '../../shared/converters/homeworkListToProposed';
import { convertHomeworkListToAppointedForStudent } from '../../shared/converters/homeworkListToToAppointedForStudent';
import { convertHomeworkListToAppointed } from '../../shared/converters/homeworkListToAppointed';
import {
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';
import { IHomeworkPageState } from '../state';
import { convertHomeworkListToSubmitted } from '../../shared/converters/homeworkListToSubmitted';

import { HomeworkPageActions } from './action-creators';

export enum HWListTypes {
  Proposed = 'proposed',
  Appointed = 'appointed',
  Submitted = 'submitted',
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
      editButton: true,
    },
  },
};
const TUTOR_VIEW: HomeworkPageOptions = {
  ...TEACHER_VIEW,
  homeworkList: {},
  homeworkButtonsCell: {
    [HWListTypes.Appointed]: {
      viewButton: true,
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
    [HWListTypes.Submitted]: {
      editAttemptButton: true,
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
          ...convertHomeworkListToProposed(state.homeworkListDefault),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Teacher) {
        TEACHER_VIEW.homeworkList[HWListTypes.Proposed] = {
          ...convertHomeworkListToProposed(state.homeworkListDefault),
        };
        TEACHER_VIEW.homeworkList[HWListTypes.Appointed] = {
          ...convertHomeworkListToAppointed(state.homeworkListDefault),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Tutor) {
        TUTOR_VIEW.homeworkList[HWListTypes.Appointed] = {
          ...convertHomeworkListToAppointed(state.homeworkListDefault),
        };

        return { ...state };
      }

      if (action.payload.currentUserRoleId === Role.Student) {
        STUDENT_VIEW.homeworkList[HWListTypes.Appointed] = {
          ...convertHomeworkListToAppointedForStudent(action.payload.homeworks),
        };
        STUDENT_VIEW.homeworkList[HWListTypes.Submitted] = {
          ...convertHomeworkListToSubmitted(action.payload.homeworks),
        };

        return { ...state };
      }

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
