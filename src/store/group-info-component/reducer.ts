import { Group } from "../../interfaces/Group";
import { GROUP_TO_VIEW_WRETCH_FAIL, GROUP_TO_VIEW_WRETCH_LOADED, GROUP_TO_VIEW_WRETCH_LOADING } from "../actionTypes";
import { IGroupInfoComponent } from "../state";
import { GroupInfoComponentActions } from "./action-creaters";

export const INIT_GROUP: Group = {
    id: 0,
    course: {
        isDeleted: false,
        id: 0,
        name: '',
        description: '',
        duration: 0,
        themes: [],
        materials: []},
    groupStatusId: 0,
    startDate: '',
    groupStatus: '',
    students: [],
    teachers: [],
    tutors: []
}

const initialState: IGroupInfoComponent = {
    groupToView: INIT_GROUP,
    isDataLoading: false,
    studentsGroup: INIT_GROUP.students
};

export function groupInfoComponentReducer(state: IGroupInfoComponent = initialState, action: GroupInfoComponentActions): IGroupInfoComponent {
    switch (action.type) {
        case GROUP_TO_VIEW_WRETCH_LOADING:
            return { ...state, isDataLoading: true }
        case GROUP_TO_VIEW_WRETCH_LOADED:
            return { ...state, groupToView: action.payload, studentsGroup:action.payload.students, isDataLoading: false };
        case GROUP_TO_VIEW_WRETCH_FAIL:
            return { ...state, isDataLoading: false };
            default: 
            return state;
    }
}