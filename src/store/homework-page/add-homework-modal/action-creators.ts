import { Homework } from "../../../interfaces/Homework";
import { HomeworkInput } from "../../../interfaces/HomeworkInput";
import { HOMEWORK_ADDED_SUCCESS, HOMEWORK_LOAD_FOR_MODAL_SUCCESS } from "../../actionTypes";

export type AddHomeworkModalActions =
 ReturnType<typeof addedHomeworkSuccess>
 | ReturnType<typeof loadHomeworkForModalSuccess>;


 export const loadHomeworkForModalSuccess = (homeworkList: Homework[]) => {
    return {
        type: HOMEWORK_LOAD_FOR_MODAL_SUCCESS,
        payload: homeworkList
    } as const
}

export const addedHomeworkSuccess = (newHomework: HomeworkInput) =>{
    return {
        type: HOMEWORK_ADDED_SUCCESS,
        payload: newHomework
    } as const
}
