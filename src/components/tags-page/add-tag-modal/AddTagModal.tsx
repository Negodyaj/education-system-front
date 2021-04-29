import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEventHandler, useState } from "react"
import { useDispatch } from "react-redux";
import { toggleModalHidden } from "../../../store/tags-page/action-creators";
import { addTag } from "../../../store/tags-page/thunk";


interface AddTagModalProps {
       hidden: boolean;
}

function AddTagModal(props: AddTagModalProps) {
    const [nameNewTag, setNameNewTag] = useState('');
    const dispatch = useDispatch();
    const closeModalWindow = () => {dispatch(toggleModalHidden())};
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
  
    const AddNewTag = () => {dispatch(addTag({name: nameNewTag}))};
    const [isDisabled, setIsDisabled] = useState(true);
    const [block, setBlock] = useState("block")
    return (
        <div className={`modal-back ${props.hidden && 'hidden'}`}>
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