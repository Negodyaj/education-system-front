import './Notification.css'
import React, { useState, useEffect, useRef } from 'react'
import NotificationData from '../../interfaces/NotificationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NotificationProps {
    notificationData: NotificationData;
    deleteNotification?: (notificationData: NotificationData) => void;
}

function Notification(props: NotificationProps) {
    const deleteRef = useRef(props.deleteNotification);
    deleteRef.current = props.deleteNotification;

    const notificationDomRef = useRef(null);
    const animateHide = () => {
        const elem = notificationDomRef.current as unknown as HTMLDivElement;
        elem.classList.remove("visible");
        elem.classList.add("hidden");
    }

    const typeToTimeout = () => {
        switch (props.notificationData.type) {
            case "information":
                return 6000;
            case "success":
                return 3000;
            case "warning":
                return 0;
            case "error":
                return 0;
        }
        return 0;
    }

    let timeout = props.notificationData.autoDismissTimeout;
    if (timeout === undefined) {
        timeout = typeToTimeout();
    }

    useEffect(() => {
        if (timeout !== 0) {
            let timer = setTimeout(dismiss, timeout);
            return () => clearTimeout(timer);
        }
    }, [])

    const dismiss = () => {
        if (props.notificationData.isDismissible) {
            animateHide();
            setTimeout(() => {
                if (deleteRef.current)
                    deleteRef.current(props.notificationData)
            }, 300);
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
        <div className={`notification visible
            ${typeToClassName()} `}
            ref={notificationDomRef}    
        >
            <div className="type-icon">
                <FontAwesomeIcon icon={typeToIconName()} />
            </div>
            <span>{props.notificationData.text}</span>
            {
                props.notificationData.isDismissible &&
                <div className="close-btn-container">
                    <button onClick={dismiss} className="close-btn">
                        <FontAwesomeIcon icon="times" />
                    </button>
                    {timeout > 0 && <svg className="circle-timer">
                        <circle r="18" cx="20" cy="20" style={{ animationDuration: timeout + "ms" }}></circle>
                    </svg>}
                </div>
            }
        </div>
    )
}

export default Notification;