import './Notification.css'
import { ReactComponent as XIcon } from '../images/x-icon.svg'

interface NotificationProps {
    type: string;
    text: string;
    isDismissible: boolean;
}

function Notification(props: NotificationProps) {
    return (
        <div className={`notification 
        ${props.type === "information" ? "info-notification" : ""}
        ${props.type === "success" ? "success-notification" : ""}
        ${props.type === "error" ? "error-notification" : ""}
        `}>
            <span>{props.text}</span>
            {
                props.isDismissible &&
                <button className="close-btn">
                    <XIcon/>
                </button>
            }
        </div>
    )
}

export default Notification;