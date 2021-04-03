import './Notification.css'
import React, { useState, useEffect, useRef } from 'react'
import NotificationData from '../../interfaces/NotificationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NotificationProps {
    notificationData: NotificationData;
    deleteNotification?: (notificationData: NotificationData) => void;
}

function Notification(props: NotificationProps) {
    const [isHidden, setIsHidden] = useState(true);
    const deleteRef = useRef(props.deleteNotification);
    deleteRef.current = props.deleteNotification;

    useEffect(() => {
        setIsHidden(false);
    }, [])

    useEffect(() => {
        let timer = setTimeout(dismiss, 3000);
        return () => clearTimeout(timer);
    }, [])

    const dismiss = () => {
        if (props.notificationData.isDismissible) {
            setIsHidden(true);
            setTimeout(() => {
                if (deleteRef.current)
                    deleteRef.current(props.notificationData)
            }, 300)
        }
    }

    const typeToClassName = () => {
        switch (props.notificationData.type) {
            case "information":
                return "info-notification";
            case "success":
                return "success-notification";
            case "warning":
                return "warning-notification";
            case "error":
                return "error-notification";
        }
        return "";
    }

    const typeToIconName = () => {
        switch (props.notificationData.type) {
            case "information":
                return "info-circle";
            case "success":
                return "check-circle";
            case "warning":
                return "exclamation-circle";
            case "error":
                return "times-circle";
        }
        return "info-circle";
    }

    return (
        <div className={`notification 
            ${isHidden ? "hidden" : ""}
            ${typeToClassName()} `}
        >
            <div className="type-icon">
                <FontAwesomeIcon icon={typeToIconName()} />
            </div>
            <span>{props.notificationData.text}</span>
            {
                props.notificationData.isDismissible &&
                <button onClick={dismiss} className="close-btn">
                    <FontAwesomeIcon icon="times" />
                </button>
            }
        </div>
    )
}

export default Notification;