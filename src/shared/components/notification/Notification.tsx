import './Notification.css'
import { ReactComponent as XIcon } from '../../images/x-icon.svg'
import { useState, useEffect } from 'react'
import NotificationData from '../../interfaces/NotificationData';

interface NotificationProps {
    notificationData: NotificationData;
    index: number;
    deleteNotification: (i: number) => void;
}

function Notification(props: NotificationProps) {
    const [isHidden, setIsHidden] = useState(true);
    useEffect(() => {
        setIsHidden(false);
    }, [])

    return (
        <div className={`notification 
        ${isHidden ? "hidden" : ""}
        ${props.notificationData.type === "information" ? "info-notification" : ""}
        ${props.notificationData.type === "success" ? "success-notification" : ""}
        ${props.notificationData.type === "error" ? "error-notification" : ""}
        `}>
            <span>{props.notificationData.text}</span>
            {
                props.notificationData.isDismissible &&
                <button onClick={() => props.deleteNotification(props.index)} className="close-btn">
                    <XIcon/>
                </button>
            }
        </div>
    )
}

export default Notification;