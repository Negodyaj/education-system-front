import { TAGS_LIST_WRETCH_LOADED } from "../actionTypes";
import { ITagsPageState } from "../state";
import { TagsPageActions } from "./action-creators";

const initialState: ITagsPageState = {
    tagList: [],
    isDataLoading: false,
    filterTagsList: [],
    tagsFilter: "",
    isTagsModalHidden: true
};

export function tagsPageReducer(state: ITagsPageState = initialState, action: TagsPageActions):ITagsPageState {
    switch (action.type) {
        
        case TAGS_LIST_WRETCH_LOADED:
            return { ...state, tagList: action.payload, isDataLoading: false };
        default:
            return state;
    }
}