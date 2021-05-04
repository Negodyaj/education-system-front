import { HomeworkPageOptions } from "../../components/homework-page/HomeworkPageCore";
import { Role } from "../../enums/role";
import { convertHomeworkListForMethodistMode } from "../../shared/converters/homeworkListForMethodistMode";
import { convertHomeworkListForTeacherMode } from "../../shared/converters/homeworkListForTeacherMode";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS, ITEMS_SET_OPEN } from "../actionTypes";
import { IHomeworkPageState } from "../state";
import { HomeworkPageActions } from "./action-creators";

const METHODIST_VIEW: HomeworkPageOptions = {
    addButton: true,
    homeworkList: {},
    homeworkButtonsCell: {
        cloneButton: true,
        deleteButton: true,
        editButton: true,
    }
}
const TEACHER_VIEW: HomeworkPageOptions = {
    addButton: false,
    homeworkList: {},
    homeworkButtonsCell: {
        appointButton: true,
        cancelAttemptButton: true,
        checkButton: true,
    }
}
const TUTOR_VIEW: HomeworkPageOptions = {
    ...TEACHER_VIEW,
    homeworkButtonsCell: {
        ...TEACHER_VIEW.homeworkButtonsCell, appointButton: false
    }
}
const STUDENT_VIEW: HomeworkPageOptions = {
    addButton: false,
    homeworkList: {},
    homeworkButtonsCell: {
        attemptButton: true
    }
}
const initialState: IHomeworkPageState = {
    homeworkListDefault: [],
    openedItemSetsNames: [],
    pageOptionsByRole: {
        [Role[Role.Methodist]]: METHODIST_VIEW,
        [Role[Role.Teacher]]: TEACHER_VIEW,
        [Role[Role.Student]]: STUDENT_VIEW,
        [Role[Role.Tutor]]: TUTOR_VIEW
    }
}

export function homeworkPageReducer(state: IHomeworkPageState = initialState, action: HomeworkPageActions): IHomeworkPageState {
    switch (action.type) {
        case HOMEWORK_LOAD_SUCCESS:
            state.openedItemSetsNames = [];
            if (action.payload.currentUserRoleId === Role.Methodist) {
                METHODIST_VIEW.homeworkList = { ...convertHomeworkListForMethodistMode(action.payload.payload) }
                return { ...state }
            } else if (action.payload.currentUserRoleId === Role.Teacher) {
                TEACHER_VIEW.homeworkList = { ...convertHomeworkListForTeacherMode(action.payload.payload) }
                return { ...state }
            } else if (action.payload.currentUserRoleId === Role.Tutor) {
                TUTOR_VIEW.homeworkList = { ...convertHomeworkListForTeacherMode(action.payload.payload) }
                return { ...state }
            } else {
                STUDENT_VIEW.homeworkList = { ['Frontend 09.07.2021']: convertHomeworkListForTeacherMode(action.payload.payload)['Frontend 09.07.2021'] }
                return { ...state }
            }
        case HOMEWORK_DELETE_PENDING:
            return {
                ...state,
                homeworkListDefault: [...state.homeworkListDefault].filter(hw => hw.id !== action.payload)
            }
        case ITEMS_SET_OPEN:
            state.openedItemSetsNames.includes(action.payload)
                ?
                state.openedItemSetsNames.splice(state.openedItemSetsNames.indexOf(action.payload), 1)
                :
                state.openedItemSetsNames.push(action.payload)
            return { ...state }
        default:
            return state;
    }
}