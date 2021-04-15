import { Tag } from "../../interfaces/Tag";
import { TAGS_LIST_FILTERED, TAGS_LIST_WRETCH_LOADED } from "../actionTypes";

export type TagsPageActions =
    | ReturnType<typeof setTagsListWasLoaded>
    | ReturnType<typeof setTagsListWasFiltered>

export const setTagsListWasLoaded = (tags: Tag[]) => {
    return ({
        type: TAGS_LIST_WRETCH_LOADED,
        payload: tags
    } as const);
}

export const setTagsListWasFiltered = (tags: Tag[]) => {
    return ({
        type: TAGS_LIST_FILTERED,
        payload: tags
    } as const);
}