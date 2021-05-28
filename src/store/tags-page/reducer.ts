import { TagInput } from '../../interfaces/TagInput';
import {
  MODAL_HIDDEN_IS_CHECK,
  TAGS_LIST_FILTERED,
  TAGS_LIST_WRETCH_ADD_TAG,
  TAGS_LIST_WRETCH_FAIL,
  TAGS_LIST_WRETCH_LOADED,
  TAGS_LIST_WRETCH_LOADING,
} from '../actionTypes';
import * as State from '../state';

import { TagsPageActions } from './action-creators';

export const defaultTagValue: TagInput = {
  name: '',
};

const initialState: State.ITagsPageState = {
  tagList: [],
  isDataLoading: false,
  filterTagsList: [],
  isTagsModalHidden: true,
  defaultFormValue: defaultTagValue,
};

export function tagsPageReducer(
  state: State.ITagsPageState = initialState,
  action: TagsPageActions
): State.ITagsPageState {
  switch (action.type) {
    case TAGS_LIST_WRETCH_LOADED:
      return {
        ...state,
        tagList: action.payload,
        filterTagsList: action.payload,
        isDataLoading: false,
      };
    case TAGS_LIST_FILTERED:
      return {
        ...state,
        filterTagsList: state.tagList.filter((tag) =>
          tag.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case MODAL_HIDDEN_IS_CHECK:
      return { ...state, isTagsModalHidden: !state.isTagsModalHidden };
    case TAGS_LIST_WRETCH_ADD_TAG:
      return { ...state, isDataLoading: false };
    case TAGS_LIST_WRETCH_LOADING:
      return { ...state, isDataLoading: true };
    case TAGS_LIST_WRETCH_FAIL:
      return { ...state, tagList: [], isDataLoading: false };
    default:
      return state;
  }
}
