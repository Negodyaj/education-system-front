import { Tag } from "../../interfaces/Tag";
import { MODAL_HIDDEN_IS_CHECK, TAGS_LIST_FILTERED, TAGS_LIST_WRETCH_ADD_TAG, TAGS_LIST_WRETCH_DELETE_TAG, TAGS_LIST_WRETCH_FAIL, TAGS_LIST_WRETCH_LOADED, TAGS_LIST_WRETCH_LOADING } from "../actionTypes";

export type TagsPageActions =
    | ReturnType<typeof setTagsListWasLoaded>
    | ReturnType<typeof doFilteringTags>
    | ReturnType<typeof toggleModalHidden>
    | ReturnType<typeof addTagAction>
    | ReturnType<typeof setTagsListIsLoading>
    | ReturnType<typeof setTagsListFail>
    | ReturnType<typeof deleteTagAction>

export const setTagsListWasLoaded = (tags: Tag[]) => {
    return ({
        type: TAGS_LIST_WRETCH_LOADED,
        payload: tags
    } as const);
}

export const doFilteringTags = (searchText: string) => {
    return ({
        type: TAGS_LIST_FILTERED,
        payload: searchText
    } as const);
}

export const toggleModalHidden = () => {
    return ({
        type: MODAL_HIDDEN_IS_CHECK,
        payload: undefined
    } as const);
}

export const addTagAction = (newTag: string) => {
    return ({
        type: TAGS_LIST_WRETCH_ADD_TAG,
        payload: newTag
    } as const);
}

export const deleteTagAction = (tagId: number) => {
    return ({
        type: TAGS_LIST_WRETCH_DELETE_TAG,
        payload: tagId
    } as const);
}

export const setTagsListIsLoading = () => {
    return ({
        type: TAGS_LIST_WRETCH_LOADING,
        payload: undefined
    } as const);
}

export const setTagsListFail = (error: string) => {
    return ({
        type: TAGS_LIST_WRETCH_FAIL,
        payload: error
    } as const);
}