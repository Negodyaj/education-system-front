import { Homework } from "../../interfaces/Homework";
import { HomeworkInput } from "../../interfaces/HomeworkInput";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS } from "../actionTypes";

export type HomeworkPageActions =
    | ReturnType<typeof deleteHomeworkRequest>
    | ReturnType<typeof loadHomeworkSuccess>;
    
export const loadHomeworkSuccess = (homeworkList: Homework[]) => {
    return {
        type: HOMEWORK_LOAD_SUCCESS,
        payload: homeworkList
    } as const
}
export const deleteHomeworkRequest = (homeworkId: number) => {
    return {
        type: HOMEWORK_DELETE_PENDING,
        payload: homeworkId
    } as const
}
