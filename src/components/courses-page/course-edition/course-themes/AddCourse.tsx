import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Themes } from "../../../../shared/themes/Themes";
import './AddCourse.css'

export interface ListOfAddCourse{
    dataCourse: Themes[],
    onThemeChange:() => void
    setModal: boolean;
    onClose: () => void

}

function AddCourse(props:ListOfAddCourse){
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)
    if (!props.setModal) return null

      
return(
    <div>
    <div className='modal' onClick={props.onClose}>
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3 className='modal-title'>Добавление темы</h3>
            <span className='modal-close' onClick={props.onClose}>
            <FontAwesomeIcon icon="minus" />
            </span>
          </div>
          <div className='modal-body'>
            <div className='modal-content'></div>
          </div >
          <div className='modal-footer'>
          <button onClick={props.onClose}>добавить</button>
          <button onClick={props.onClose}>отмена</button>
        </div>
        </div> 
      </div>
    </div>

)
}

export default AddCourse

