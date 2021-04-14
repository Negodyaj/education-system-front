import { ICoursePageState } from "../state";

const initialState: ICoursePageState = {
    courseList: [],
    isDataLoading: true
};
export function coursePageReducer(state: ICoursePageState = initialState, action: any): ICoursePageState {
    switch (action.type) {
        default:
            return state;
    }
}