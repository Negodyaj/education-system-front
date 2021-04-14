import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { url } from "node:inspector";
import React, { ChangeEventHandler, useState } from "react"
import { Tag } from "../../../interfaces/Tag";
import { sendGetRequest, sendPostRequest } from "../../../services/http.service"
import { responseHandlers } from "../../../services/response-handler/responseHandler";
import { TagAddEnd, TagEnd } from "../../../shared/endpointConsts";
import NotificationData from "../../../shared/interfaces/NotificationData";

interface AddTagModalProps {
    sendNotification: (newNotification: NotificationData | undefined) => void;
    setTagsInState: (uptags: Tag[]|undefined) => void;
    setHidden: () => void;
    hidden: string;
}

function AddTagModal(props: AddTagModalProps) {
    const [nameNewTag, setNameNewTag]= useState('');
    
    const closeModalWindow = () => {(props.setHidden())};
    const tagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameNewTag(e.target.value);
    };
    const AddNewTag = async () => {
    //     let a;
    //     if (a=!!await sendPostRequest<Tag>('Tag', props.sendNotification, responseHandlers[TagAddEnd], {name: nameNewTag}))
    //    props.setTagsInState(await sendGetRequest<Tag[]>('Tag', props.sendNotification, responseHandlers[TagEnd])) 
    };

    return (
        <div className={"modal-back " + (props.hidden)}>
            <div className="modal">
                <div className="head-modal"><h4>Введите новый тег</h4></div>
                <button className="button-close"  onClick={closeModalWindow}>
                    <FontAwesomeIcon icon='times' />
                </button>
            
            <div className="create-tag">
                <div className="tag-data">
                    <input type="text" className="tag-name" value={nameNewTag} onChange={tagOnChange}/>
                </div>
            </div>
            <div className="select-delete">
                <button className="button-select"  onClick={closeModalWindow}>Отмена</button>
                <button className="button-select" onClick={AddNewTag}>Ок</button>
            </div>
            </div>
        </div>
    )
}
export default AddTagModal