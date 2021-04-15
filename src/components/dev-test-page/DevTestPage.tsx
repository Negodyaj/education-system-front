import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../interfaces/NotificationData";

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

            <div className="test-page-link"><Link to="/">back to login</Link></div>
        </div>
    )
}

export default DevTestPage;