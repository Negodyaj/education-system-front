import { Dispatch } from "redux";
import { Tag } from "../../interfaces/Tag";
import { TagInput } from "../../interfaces/TagInput";
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest, sendPostRequest } from "../../services/http.service";
import { isTag } from "../../services/type-guards/tag";
import { isTagArr } from "../../services/type-guards/tagArr";
import { tagsUrl } from "../../shared/consts";
import { makeNotification } from "../../shared/helpers/notificationHelpers";
import { pushNotification } from "../notifications/action-creators";
import { thunkResponseHandler } from "../thunkResponseHadlers";
import {  setTagsListWasLoaded } from "./action-creators";

export const getTags = () => {
    return (dispatch: Dispatch) => {     
        sendGetRequest<Tag[]>(tagsUrl, isTagArr)
            .then(tags => dispatch(setTagsListWasLoaded(tags)))             
    }
}

export const addTag = (newTag: TagInput) =>{
    return (dispatch: Dispatch<any>) => {  
        sendPostRequest<Tag> (`${tagsUrl}`,isTag, newTag)
        .then(tag => {
            let response = thunkResponseHandler(dispatch, tag);
            response && dispatch(pushNotification(makeNotification('success', `Тег ${(response as Tag).name} успешно добавлен`)));
            dispatch(getTags());
        })
        .catch(error => thunkResponseHandler(dispatch, error));
    }
}

export const deleteTagThunk =  (id: number, tagName: string) => {
    return (dispatch: Dispatch<any>)=> {  
        sendDeleteRequestNoResponse(`${tagsUrl}/${id}`)
         .then(tag => {
            if (tag.status> 204)
            thunkResponseHandler(dispatch,tag)
            else 
           dispatch(pushNotification(makeNotification('success', `Тег ${tagName} успешно удален`)));
            dispatch(getTags());
        })
    }
}



