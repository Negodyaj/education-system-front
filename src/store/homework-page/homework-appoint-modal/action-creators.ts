import { Group } from "../../../interfaces/Group";
import { GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED } from "../../actionTypes";

export type HomeworkAppointModalActions =
    ReturnType<typeof groupListByTeacherIdLoaded>;
export const groupListByTeacherIdLoaded = (groupList: Group[]) => {
    return {
        type: GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED,
        payload: groupList
    } as const
}