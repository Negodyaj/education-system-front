import { faClone } from "@fortawesome/free-solid-svg-icons";
import { HomeworkPageOptions } from "../../components/homework-page/HomeworkPageCore";
import { Role } from "../../enums/role";
import { Homework } from "../../interfaces/Homework";
import { convertHomeworkListForMethodistMode } from "../../shared/converters/homeworkListForMethodistMode";
import { convertHomeworkListForTeacherMode } from "../../shared/converters/homeworkListForTeacherMode";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS, METHODIST_LIST_ITEM_OPEN, TEACHER_LIST_ITEM_OPEN } from "../actionTypes";
import { HomeworksByCourse, IHomeworkPageState } from "../state";
import { HomeworkPageActions } from "./action-creators";

const METHODIST_VIEW: HomeworkPageOptions = {
    addButton: true,
    homeworkSelector: Role.Methodist,
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
    homeworkListMethodist: {},
    homeworkListTeacher: {},
    openedCourseName: [],
    openedGroupId: [],
    pageOptionsByRole: {
        [Role[Role.Methodist]]: METHODIST_VIEW,
        [Role[Role.Teacher]]: TEACHER_VIEW
    }
}

export function homeworkPageReducer(state: IHomeworkPageState = initialState, action: HomeworkPageActions): IHomeworkPageState {
    switch (action.type) {
        case HOMEWORK_LOAD_SUCCESS:
            if (action.payload.currentUserRoleId === Role.Methodist) {
                return {
                    ...state,
                    homeworkListMethodist: { ...convertHomeworkListForMethodistMode(action.payload.payload) }
                }
            } else {
                console.log(convertHomeworkListForTeacherMode(action.payload.payload));
                return {
                    ...state,
                    homeworkListTeacher: { ...convertHomeworkListForTeacherMode(action.payload.payload) }
                }
            }
        case HOMEWORK_DELETE_PENDING:
            return {
                ...state,
                homeworkListDefault: [...state.homeworkListDefault.filter(hw => hw.id !== action.payload)]
            }
        case METHODIST_LIST_ITEM_OPEN:
            state.openedCourseName.includes(action.payload)
                ?
                state.openedCourseName.splice(state.openedCourseName.indexOf(action.payload), 1)
                :
                state.openedCourseName.push(action.payload)
            return { ...state }
        case TEACHER_LIST_ITEM_OPEN:
            state.openedGroupId.includes(action.payload)
                ?
                state.openedGroupId.splice(state.openedGroupId.indexOf(action.payload), 1)
                :
                state.openedGroupId.push(action.payload)
            return { ...state }
        default:
            return state;
    }
}