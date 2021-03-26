import { useState } from 'react';
import NotificationData from '../../interfaces/NotificationData';
import { generateTestNotification } from './generateTestNotification';
import Notification from './Notification';
import './NotificationContainer.css';

function NotificationContainer() {

    const [dismissibleNotifications, setDismissibleNotifications] = useState<NotificationData[]>([]);
    const [nonDismissibleNotifications, setNonDismissibleNotifications] = useState<NotificationData[]>([]);

    const sendNewNotification = (newNotification: NotificationData) => {
        if (newNotification.isDismissible) {
            setDismissibleNotifications([newNotification, ...dismissibleNotifications]);
        } else {
            setNonDismissibleNotifications([newNotification, ...nonDismissibleNotifications]);
        }
    }

    const deleteNotification = (dismissedNotification: NotificationData) => {
        const newState = dismissibleNotifications.filter(notification => notification != dismissedNotification);
        setDismissibleNotifications(newState);
    }

    return (
        <div className="notification-container">
            <div className="non-dismissible-notifications">
                {nonDismissibleNotifications.map(notification => {
                    return (
                        <Notification
                            key={notification.text}
                            notificationData={notification}
                            deleteNotification={deleteNotification} />
                    )
                })}
            </div>
            <div className="dismissible-notifications">
                {dismissibleNotifications.map(notification => {
                    return (
                        <Notification
                            key={notification.text}
                            notificationData={notification}
                            deleteNotification={deleteNotification} />
                    )
                })}
            </div>
            <div className="test-button-container">
                <button onClick={() => sendNewNotification(generateTestNotification(true))}>dismissibleNotification</button>
                <button onClick={() => sendNewNotification(generateTestNotification(false))}>nonDismissibleNotification</button>
            </div>
        </div>
    )

}

export default NotificationContainer;