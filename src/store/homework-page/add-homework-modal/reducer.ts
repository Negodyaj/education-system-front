import { HomeworkInput } from "../../../interfaces/HomeworkInput";
import { COURSES_LOAD_FOR_HW_MODAL_SUCCESS, HOMEWORK_LOAD_FOR_MODAL_SUCCESS } from "../../actionTypes";
import { IAddHomeworkModal } from "../../state";
import { AddHomeworkModalActions } from "./action-creators";

const defaultValues: HomeworkInput = {
    description: "",
    courseId: 0

}

const initialState: IAddHomeworkModal = {
    isDataLoading: false,
    defaultFormValue: defaultValues,
    isModalHidden: false,
}

export function addHomeworkModalReducer(state: IAddHomeworkModal = initialState, action: AddHomeworkModalActions): IAddHomeworkModal {
    switch (action.type) {
        case HOMEWORK_LOAD_FOR_MODAL_SUCCESS:
            return { ...state, isDataLoading: false, isModalHidden: false, }
        case COURSES_LOAD_FOR_HW_MODAL_SUCCESS:
            return {...state, isDataLoading: false, isModalHidden: false,}

        default:
            return state;
    }

}