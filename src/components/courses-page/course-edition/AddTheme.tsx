import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Themes } from "../../../interfaces/Themes";
import './AddTheme.css'

export interface ListOfAddCourse {
    dataCourse: Themes[] | undefined,
    onThemeChange: () => void
    setModal: boolean;
    onClose: () => void

}


function AddTheme(props: ListOfAddCourse) {
    const [theme, setTheme] = useState('')
    function eventForm(event: any) {
        let a = event.target.value;
        setTheme(a);
    }

    const onAddTheme = () => {
        if (props.dataCourse!=undefined){
            let id = props.dataCourse[props.dataCourse.length - 1].id + 1;
        props.dataCourse.push({ isDeleted: false, id: id, name: theme });
        props.onClose(); 
        onClear();
        }
               
    }

    const onClear=()=>{
        let a = '';
        setTheme(a);
    }

    const onClose=()=>{
        props.onClose();
        onClear();
    }

    if (!props.setModal) {
        return null
    }

    return (
        <div>
            <div className='modal' onClick={props.onClose}>
                <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                    <div className='modal-header'>
                        <h3 className='modal-title'>Добавление темы</h3>
                        <span className='modal-close' onClick={onClose}>
                            <FontAwesomeIcon icon="minus" />
                        </span>
                    </div>
                    <div className='modal-body'>
                        <div className='modal-content'>
                            <form>
                                <input defaultValue='' onChange={eventForm} value={theme} />
                            </form>
                        </div>
                    </div >
                    <div className='modal-footer'>
                        <button onClick={onAddTheme}>добавить</button>
                        <button onClick={onClose}>отмена</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTheme
