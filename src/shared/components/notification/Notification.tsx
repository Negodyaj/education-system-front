import './Notification.css'
import { ReactComponent as XIcon } from '../../images/x-icon.svg'
import { useState, useEffect } from 'react'

interface NotificationProps {
    type: string;
    text: string;
    isDismissible: boolean;
}

function Notification(props: NotificationProps) {
    const [isHidden, setIsHidden] = useState(true);
    useEffect(() => {
        setIsHidden(false);
    }, [])

    return (
        <div className={`notification 
        ${isHidden ? "hidden" : ""}
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