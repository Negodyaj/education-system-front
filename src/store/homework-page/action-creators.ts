import { Homework } from "../../interfaces/Homework";
import { HOMEWORK_DELETE_PENDING, HOMEWORK_LOAD_SUCCESS, METHODIST_LIST_ITEM_OPEN, TEACHER_LIST_ITEM_OPEN } from "../actionTypes";

export type HomeworkPageActions =
    ReturnType<typeof deleteHomeworkRequest>
    | ReturnType<typeof loadHomeworkSuccess>
    | ReturnType<typeof openHomeworkListMethodistItem>
    | ReturnType<typeof openHomeworkListTeacherItem>;


export const loadHomeworkSuccess = (homeworkList: Homework[], currentUserRoleId: number) => {
    return {
        type: HOMEWORK_LOAD_SUCCESS,
        payload: {
            payload: homeworkList,
            currentUserRoleId: currentUserRoleId
        }
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
export const openHomeworkListTeacherItem = (groupId: number) => {
    return {
        type: TEACHER_LIST_ITEM_OPEN,
        payload: groupId
    } as const
}