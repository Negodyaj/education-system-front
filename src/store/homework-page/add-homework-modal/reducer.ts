import { HomeworkInput } from "../../../interfaces/HomeworkInput";
import { HOMEWORK_LOAD_FOR_MODAL_SUCCESS } from "../../actionTypes";
import { IAddHomeworkModal } from "../../state";
import { AddHomeworkModalActions } from "./action-creators";

const defaultValues: HomeworkInput = {
    courseId : 0,
     description : ""

}

const initialState: IAddHomeworkModal = {
    isDataLoading: false,
    defaultFormValue: defaultValues,
    isModalHidden: false,
}

export function addHomeworkModalReducer(state: IAddHomeworkModal = initialState, action: AddHomeworkModalActions): IAddHomeworkModal {
    switch (action.type) {
case HOMEWORK_LOAD_FOR_MODAL_SUCCESS:
    return{ ...state, isDataLoading: false, isModalHidden: false, }

      default:
            return state;
    }
}