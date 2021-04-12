import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEventHandler, useState } from "react"
import { sendPostRequest } from "../../../services/http.service"
import { Tag } from "../../interfaces/Tag"



function AddTagModal() {
    const [nameNewTag, setNameNewTag]= useState('');
   
    const closeModalWindow = () => {};
    const AddNewTag =() => {sendPostRequest<Tag>('Tag', {name: nameNewTag})}
    const tagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameNewTag(e.target.value);
    };

    return (
        <div className="modal-back">
            <div className="modal">
                <div className="head-modal"><h4>Введите новый тег</h4></div>
                <button className="button-close" onClick={closeModalWindow}>
                    <FontAwesomeIcon icon='times' />
                </button>
            
            <div className="create-tag">
                <div className="tag-data">
                    <input type="text" className="tag-name" value={nameNewTag} onChange={tagOnChange}/>
                </div>
            </div>
            <div className="select-delete">
                <button className="button-select" onClick={closeModalWindow}>Отмена</button>
                <button className="button-select" onClick={AddNewTag}>Ок</button>
            </div>
            </div>
        </div>
    )
}
export default AddTagModal