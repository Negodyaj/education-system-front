import { useState } from 'react';
import NotificationData from '../../interfaces/NotificationData';
import { generateTestNotification } from './generateTestNotification';
import Notification from './Notification';
import './NotificationContainer.css';

function NotificationContainer() {

    const [dismissibleNotifications, setDismissibleNotifications] = useState<NotificationData[]>([]);
    const [nonDismissibleNotifications, setNonDismissibleNotifications] = useState<NotificationData[]>([]);

    const generateNotification = (isDismissible: boolean) => {
        const newNotification = generateTestNotification(isDismissible);
        const newState = isDismissible ? 
            [newNotification, ...dismissibleNotifications] :
            [newNotification, ...nonDismissibleNotifications]
        isDismissible ? 
            setDismissibleNotifications(newState) : 
            setNonDismissibleNotifications(newState);
    }
    
    const deleteNotification = (index: number) => {
        const newState = dismissibleNotifications.slice();
        newState.splice(index, 1);
        setDismissibleNotifications(newState);
    }

    return (
        <div className="notification-container">
            <div className="non-dismissible-notifications">
                {nonDismissibleNotifications.map((notification, index) => {
                    return (
                        <Notification 
                        key={notification.text}
                        index={index}
                        notificationData={notification} 
                        deleteNotification={deleteNotification}/>
                    )
                })}
            </div>
            <div className="dismissible-notifications">
            {dismissibleNotifications.map((notification, index) => {
                    return (
                        <Notification 
                        key={notification.text} 
                        index={index}
                        notificationData={notification}
                        deleteNotification={deleteNotification}/>
                    )
                })}
            </div>
            <div className="test-button-container">
                <button onClick={() => generateNotification(true)}>dismissibleNotification</button>
                <button onClick={() => generateNotification(false)}>nonDismissibleNotification</button>
            </div>
        </div>
    )

}

export default NotificationContainer;