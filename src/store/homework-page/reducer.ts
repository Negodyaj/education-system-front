import { Homework } from "../../interfaces/Homework";
import { convertHomeworkListForMethodistMode } from "../../shared/converters/homeworkListForMethodistMode";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { HOMEWORK_ADDED_SUCCESS, HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS } from "../actionTypes";
import { HomeworksByCourse, IHomeworkPageState } from "../state";
import { HomeworkPageActions } from "./action-creators";

const initialState: IHomeworkPageState = {
    homeworkListDefault: [],
    homeworkListMethodist: {}
}

export function homeworkPageReducer(state: IHomeworkPageState = initialState, action: HomeworkPageActions): IHomeworkPageState {
    switch (action.type) {
        case HOMEWORK_LOAD_SUCCESS:
            return {
                ...state,
                homeworkListMethodist: { ...convertHomeworkListForMethodistMode(action.payload) }
            }
        case HOMEWORK_DELETE_PENDING:
            return {
                ...state,
                homeworkListDefault: [...state.homeworkListDefault.filter(hw => hw.id !== action.payload)]
            }
        default:
            return state;
    }
}