import { Tag } from "../../interfaces/Tag";
import { MODAL_HIDDEN_IS_CHECK, TAGS_LIST_FILTERED, TAGS_LIST_WRETCH_LOADED } from "../actionTypes";

export type TagsPageActions =
    | ReturnType<typeof setTagsListWasLoaded>
    | ReturnType<typeof doFilteringTags>
    | ReturnType<typeof toggleModalHidden>

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