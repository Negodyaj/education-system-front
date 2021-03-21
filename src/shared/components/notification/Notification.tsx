import './Notification.css'
import { ReactComponent as XIcon } from '../../images/x-icon.svg'
import { useState, useEffect } from 'react'
import NotificationData from '../../interfaces/NotificationData';

interface NotificationProps {
    notificationData: NotificationData;
    deleteNotification: (notificationData: NotificationData) => void;
}

function Notification(props: NotificationProps) {
    const [isHidden, setIsHidden] = useState(true);
    useEffect(() => {
        setIsHidden(false);
    }, [])

    // useEffect(() => {
    //     setTimeout(dismiss, 3000);
    // }, [])

    const dismiss = () => {
        if (props.notificationData.isDismissible) {
            setIsHidden(true);
            setTimeout(() => props.deleteNotification(props.notificationData), 700)
        }
    }

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
                <button onClick={ dismiss } className="close-btn">
                    <XIcon/>
                </button>
            }
        </div>
    )
}

export default Notification;