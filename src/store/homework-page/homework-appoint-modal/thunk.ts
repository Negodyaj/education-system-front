import { Dispatch } from "react"
import { groupList } from "../../../shared/tmp-mock-data/hw/groupList"
import { groupListByTeacherIdLoaded } from "./action-creators"

export const getGroupsByTeacherId = (teacherId: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(groupListByTeacherIdLoaded(groupList))
    }
}