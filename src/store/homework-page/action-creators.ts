import { Homework } from "../../interfaces/Homework";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS, METHODIST_LIST_ITEM_OPEN } from "../actionTypes";

export type HomeworkPageActions =
    ReturnType<typeof deleteHomeworkRequest>
    | ReturnType<typeof loadHomeworkSuccess>
    | ReturnType<typeof openHomeworkListMethodistItem>;


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
export const openHomeworkListMethodistItem = (courseName: string) => {
    return {
        type: METHODIST_LIST_ITEM_OPEN,
        payload: courseName
    } as const
}