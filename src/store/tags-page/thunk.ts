import { Dispatch } from "redux";
import { Tag } from "../../interfaces/Tag";
import { sendGetRequest } from "../../services/http.service";
import { isTagArr } from "../../services/type-guards/tagArr";
import { coursesUrl, tagsUrl } from "../../shared/consts";
import {  setTagsListWasLoaded } from "./action-creators";

export const getTags = () => {
    return (dispatch: Dispatch) => {     
        sendGetRequest<Tag[]>(tagsUrl, isTagArr)
            .then(tags => dispatch(setTagsListWasLoaded(tags)))
                    
    }
}