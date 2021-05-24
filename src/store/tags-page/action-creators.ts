import { Tag } from '../../interfaces/Tag';
import { TagInput } from '../../interfaces/TagInput';
import {
  ADD_TAG,
  DELETE_TAG,
  GET_TAGS,
  MODAL_HIDDEN_IS_CHECK,
  TAGS_LIST_FILTERED,
  TAGS_LIST_WRETCH_ADD_TAG,
  TAGS_LIST_WRETCH_FAIL,
  TAGS_LIST_WRETCH_LOADED,
  TAGS_LIST_WRETCH_LOADING,
} from '../actionTypes';

export type TagsPageActions =
  | ReturnType<typeof setTagsListWasLoaded>
  | ReturnType<typeof doFilteringTags>
  | ReturnType<typeof toggleModalHidden>
  | ReturnType<typeof addTagAction>
  | ReturnType<typeof setTagsListIsLoading>
  | ReturnType<typeof setTagsListFail>
  | ReturnType<typeof loadTagsListWatcherAction>
  | ReturnType<typeof deleteTagWatcherAction>
  | ReturnType<typeof addTagWatcherAction>;

export const setTagsListWasLoaded = (tags: Tag[]) =>
  ({
    type: TAGS_LIST_WRETCH_LOADED,
    payload: tags,
  } as const);

export const doFilteringTags = (searchText: string) =>
  ({
    type: TAGS_LIST_FILTERED,
    payload: searchText,
  } as const);

export const toggleModalHidden = () =>
  ({
    type: MODAL_HIDDEN_IS_CHECK,
    payload: undefined,
  } as const);

export const addTagAction = (newTag: string) =>
  ({
    type: TAGS_LIST_WRETCH_ADD_TAG,
    payload: newTag,
  } as const);

export const setTagsListIsLoading = () =>
  ({
    type: TAGS_LIST_WRETCH_LOADING,
    payload: undefined,
  } as const);

export const setTagsListFail = (error: string) =>
  ({
    type: TAGS_LIST_WRETCH_FAIL,
    payload: error,
  } as const);

export const loadTagsListWatcherAction = () =>
  ({
    type: GET_TAGS,
  } as const);

export const deleteTagWatcherAction = (id: number, tagName: string) =>
  ({
    type: DELETE_TAG,
    payload: { id, name: tagName },
  } as const);

export const addTagWatcherAction = (newTag: TagInput) =>
  ({
    type: ADD_TAG,
    payload: newTag,
  } as const);
