import { DictionaryEntity } from "../../../interfaces/DictionaryEntity";
import { GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED } from "../../actionTypes";
import { IHomeworkAppointModalState } from "../../state";
import { HomeworkAppointModalActions } from "./action-creators";

const APPOINT_FORM_DEFAULTS = {
    group: [],
    deadline: ""
}
const initialState: IHomeworkAppointModalState = {
    groupListByTeacherId: [],
    groupEntities: [],
    appointFormDefaults: APPOINT_FORM_DEFAULTS
}

export function homeworkAppointModalReducer(state: IHomeworkAppointModalState = initialState, action: HomeworkAppointModalActions): IHomeworkAppointModalState {
    switch (action.type) {
        case GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED:
            let localGroupEntities: DictionaryEntity[] = []
            action.payload.map(group =>
                localGroupEntities.push({
                    id: group.id,
                    name: `${group.course.name} ${group.startDate}`
                }))
            return {
                ...state,
                groupListByTeacherId: action.payload,
                groupEntities: localGroupEntities
            }

        default: return state;
    }
}