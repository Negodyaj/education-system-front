import { useState } from "react";
import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../shared/interfaces/NotificationData";

interface DevTestPageProps {
    sendNotification: (newNotification: NotificationData) => void;
}

function DevTestPage (props: DevTestPageProps) {
    const [dialogActive, setDialogActive] = useState(false);

    return (
        <div>
            <h1>(dev) test-page</h1>

            <button onClick={() => props.sendNotification(generateTestNotification(true))}>
                Test dismissable notification</button>
            <button onClick={() => props.sendNotification(generateTestNotification(false))}>
                Test non-dismissable notification</button>

            <div>
                <button onClick={() => {setDialogActive(true)}}>Show dialog</button> 
            </div>

            <ConfirmationDialog isActive={dialogActive} setIsActive={setDialogActive}/>
        </div>
    )
}

export default DevTestPage;