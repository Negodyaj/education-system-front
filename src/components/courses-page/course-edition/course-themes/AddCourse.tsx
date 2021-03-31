import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Themes } from "../../../../shared/themes/Themes";
import './AddCourse.css'

export interface ListOfAddCourse {
    dataCourse: Themes[],
    onThemeChange: () => void
    setModal: boolean;
    onClose: () => void

}

function AddCourse(props: ListOfAddCourse) {
    const [theme, setTheme] = useState('')
    function eventForm(event: any) {
        let a = event.target.value;
        setTheme(a);
    }

    const onAddTheme = () => {
        let id = props.dataCourse[props.dataCourse.length - 1].id + 1;
        props.dataCourse.push({ id: id, name: theme, check: false });
        props.onClose(); 
        onClear();       
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

export default AddCourse

