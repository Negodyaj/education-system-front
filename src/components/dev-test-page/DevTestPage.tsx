import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../shared/interfaces/NotificationData";
import { SelectItem } from "../interfaces/SelectItem";
import CustomMultiSelect from "../multi-select/CustomMultiSelect";

interface DevTestPageProps {
    sendNotification: (newNotification: NotificationData) => void;
}

function DevTestPage (props: DevTestPageProps) {
    const [dialogShown, setDialogShown] = useState(false);
    const [counter, setCounter] = useState(0);

    const counterCallback = (decision: boolean) => {
        if (decision) {
            setCounter(counter+1);
        }
        setDialogShown(false);
    }

    const selectItems:SelectItem[]= [
        {
            value: 1,
            label: "aaa"
        },
        {
            value: 2,
            label: "bbb"
        },
        {
            value: 3,
            label: "ccc"
        }
    ]

    return (
        <div>
            <h1>secret test page</h1>

            <button onClick={() => props.sendNotification(generateTestNotification(true))}>
                Test dismissible notification</button>
            <button onClick={() => props.sendNotification(generateTestNotification(false))}>
                Test non-dismissible notification</button>

            <div>
                <span>{counter}</span>
                <button onClick={() => {setDialogShown(true)}}>+1</button> 
            </div>

            <ConfirmationDialog 
                isShown={dialogShown} 
                title={'Увеличить счетчик на 1?'}
                message={`Новое значение: ${counter+1}`}
                callback={counterCallback}/>

            <CustomMultiSelect
                userOptionsIds={[]}
                options={selectItems}
                onSelect={()=>{}}
            />
            <CustomMultiSelect
                selectType='multi'
                userOptionsIds={[]}
                options={selectItems}
                onSelect={()=>{}}
            />

            <div className="test-page-link"><Link to="/">back to login</Link></div>
        </div>
    )
}

export default DevTestPage;