import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../shared/interfaces/NotificationData";

interface DevTestPageProps {
    sendNotification: (newNotification: NotificationData) => void;
}

function DevTestPage (props: DevTestPageProps) {
    return (
        <div>
            <h1>(dev) test-page</h1>

            <button onClick={() => props.sendNotification(generateTestNotification(true))}>
                Test dismissable notification</button>
            <button onClick={() => props.sendNotification(generateTestNotification(false))}>
                Test non-dismissable notification</button>

            <ConfirmationDialog/>
        </div>
    )
}

export default DevTestPage;