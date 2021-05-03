import { faClone } from "@fortawesome/free-solid-svg-icons";
import { HomeworkPageOptions } from "../../components/homework-page/HomeworkPageCore";
import { Role } from "../../enums/role";
import { Homework } from "../../interfaces/Homework";
import { convertHomeworkListForMethodistMode } from "../../shared/converters/homeworkListForMethodistMode";
import { convertHomeworkListForTeacherMode } from "../../shared/converters/homeworkListForTeacherMode";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS, ITEMS_SET_OPEN } from "../actionTypes";
import { HomeworksByCourse, IHomeworkPageState } from "../state";
import { HomeworkPageActions } from "./action-creators";

const METHODIST_VIEW: HomeworkPageOptions = {
    addButton: true,
    homeworkSelector: Role.Methodist,
    homeworkList: {},
    homeworkButtonsCell: {
        attemptButton: false,
        cloneButton: true,
        deleteButton: true,
        cancelAttemptButton: false,
        editButton: true
    }
}

const TEACHER_VIEW: HomeworkPageOptions = {
    addButton: false,
    homeworkSelector: Role.Teacher,
    homeworkList: {},
    homeworkButtonsCell: {
        attemptButton: true,
        cloneButton: false,
        deleteButton: false,
        cancelAttemptButton: true,
        editButton: false
    }
}

const initialState: IHomeworkPageState = {
    homeworkListDefault: [],
    openedItemSetsNames: [],
    pageOptionsByRole: {
        [Role[Role.Methodist]]: METHODIST_VIEW,
        [Role[Role.Teacher]]: TEACHER_VIEW
    }
}

export function homeworkPageReducer(state: IHomeworkPageState = initialState, action: HomeworkPageActions): IHomeworkPageState {
    switch (action.type) {
        case HOMEWORK_LOAD_SUCCESS:
            if (action.payload.currentUserRoleId === Role.Methodist) {
                METHODIST_VIEW.homeworkList = { ...convertHomeworkListForMethodistMode(action.payload.payload) }
                return { ...state }
            } else {
                TEACHER_VIEW.homeworkList = { ...convertHomeworkListForTeacherMode(action.payload.payload) }
                return { ...state }
            }
        case HOMEWORK_DELETE_PENDING:
            return {
                ...state,
                homeworkListDefault: [...state.homeworkListDefault.filter(hw => hw.id !== action.payload)]
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