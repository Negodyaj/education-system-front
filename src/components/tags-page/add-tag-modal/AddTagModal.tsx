import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEventHandler, useState } from "react"
import { sendGetRequest, sendPostRequest } from "../../../services/http.service"
import { responseHandlers } from "../../../services/response-handler/responseHandler";
import { TagAddEnd, TagEnd } from "../../../shared/endpointConsts";
import NotificationData from "../../../shared/interfaces/NotificationData";
import { Tag } from "../../interfaces/Tag"

interface AddTagModalProps {
    sendNotification: (newNotification: NotificationData | undefined) => void;
    setTagsInState: (uptags: Tag[] | undefined) => void;
    setHidden: () => void;
    hidden: string;
}

function AddTagModal(props: AddTagModalProps) {
    const [nameNewTag, setNameNewTag] = useState('');

    const closeModalWindow = () => { (props.setHidden()) };
    const tagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameNewTag(e.target.value);
        if (e.target.value.length > 2) {
            setIsDisabled(false)
            setBlock("")
        }
        else {
            setIsDisabled(true)
            setBlock("block")
        }
    };
    const AddNewTag = async () => {
        let a;
        if (a = !!await sendPostRequest<Tag>('Tag', props.sendNotification, responseHandlers[TagAddEnd], { name: nameNewTag }))
            props.setTagsInState(await sendGetRequest<Tag[]>('Tag', props.sendNotification, responseHandlers[TagEnd]))
    };
    const [isDisabled, setIsDisabled] = useState(true);
    const [block, setBlock] = useState("block")
    return (
        <div className={"modal-back " + (props.hidden)}>
            <div className="modal">
                <div className="head-modal"><h4>Введите новый тег</h4></div>
                <button className="button-close" onClick={closeModalWindow}>
                    <FontAwesomeIcon icon='times' />
                </button>

                <div className="create-tag">
                    <div className="tag-data">
                        <input type="text" className="tag-name" value={nameNewTag} onChange={tagOnChange} />
                    </div>
                </div>
                <div className="select-delete">
                    <button className="button-select" onClick={closeModalWindow}>Отмена</button>
                    <button className={"button-select " + block} onClick={AddNewTag} disabled={isDisabled}>Ок</button>
                </div>
            </div>
        </div>
    )
}
export default AddTagModal