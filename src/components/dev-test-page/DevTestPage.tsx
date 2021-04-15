import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../interfaces/NotificationData";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../store/notifications/thunk";

interface DevTestPageProps {
}

function DevTestPage (props: DevTestPageProps) {
    const dispatch = useDispatch();
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

            <button onClick={()=>dispatch(sendNotification(generateTestNotification(true)))} >
                Test dismissible notification</button>
            <button onClick={()=>dispatch(sendNotification(generateTestNotification(false)))} >
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