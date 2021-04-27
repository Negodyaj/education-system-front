import { Group } from "../../interfaces/Group";
import { GROUP_TO_VIEW_WRETCH_FAIL, GROUP_TO_VIEW_WRETCH_LOADED, GROUP_TO_VIEW_WRETCH_LOADING } from "../actionTypes";
import { IGroupInfoComponent } from "../state";
import { GroupInfoComponentActions } from "./action-creaters";

export const INIT_GROUP: Group={
    startDate: '',
    groupStatus: '',
    students: [],
    teachers: [],
    tutors: []
}

const initialState: IGroupInfoComponent = {
    groupToView: INIT_GROUP,
    isDataLoading: false
};

export function groupInfoComponentReducer(state: IGroupInfoComponent = initialState, action: GroupInfoComponentActions): IGroupInfoComponent {
    switch (action.type) {
        case GROUP_TO_VIEW_WRETCH_LOADING:
            return { ...state, isDataLoading: true }
        case GROUP_TO_VIEW_WRETCH_LOADED:
            return { ...state, groupToView: action.payload, isDataLoading: false };
        case GROUP_TO_VIEW_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
            default: 
            return state;
    }
}