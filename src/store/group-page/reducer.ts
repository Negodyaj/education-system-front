import { Group } from "../../interfaces/Group";
import { GROUP_TO_VIEW_WRETCH_FAIL, GROUP_TO_VIEW_WRETCH_LOADED, GROUP_TO_VIEW_WRETCH_LOADING } from "../actionTypes";
import { IGroupPage } from "../state";
import { GroupPageActions } from "./action-creaters";


const initialState: IGroupPage = {
    groupList: undefined,
    groupToView: undefined,
    isDataLoading: false
};

export function groupPageReducer(state: IGroupPage = initialState, action: GroupPageActions): IGroupPage {
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