import { Homework } from "../../interfaces/Homework";
import { homeworkList } from "../../shared/tmp-mock-data/hw/homeworkList";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS } from "../actionTypes";
import { HomeworksByCourse, IHomeworkPageState } from "../state";
import { HomeworkPageActions } from "./action-creators";

const INIT_HOMEWORK: Homework = { ...homeworkList[0] }

const initialState: IHomeworkPageState = {
    homeworkListDefault: [],
    homeworkListMethodist: {}
}

export function homeworkPageReducer(state: IHomeworkPageState = initialState, action: HomeworkPageActions): IHomeworkPageState {
    switch (action.type) {
        case HOMEWORK_LOAD_SUCCESS:
            let previousCourseId: number | undefined = undefined;
            let result: HomeworksByCourse = {};
            action.payload.map(hw => {
                if (hw.group.course.id === previousCourseId) {
                    result[hw.group.course.id].push(hw)
                } else {
                    if (result[hw.group.course.id] === undefined) {
                        result[hw.group.course.id] = [...[INIT_HOMEWORK]]
                    }
                    if (result[hw.group.course.id].length === 1) result[hw.group.course.id][0] = hw;
                    else result[hw.group.course.id].push(hw)
                }
                previousCourseId = hw.group.course.id;
            })
            return {
                ...state,
                homeworkListMethodist: { ...result }
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