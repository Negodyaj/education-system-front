import { ICourseListPageState } from "../state";

const initialState: ICourseListPageState = {
    courseList: [],
    isDataLoading: true
};
export function courseListPageReducer(state: ICourseListPageState = initialState, action: any): ICourseListPageState {
    switch (action.type) {
        default:
            return state;
    }
}