import NotificationData from '../../../interfaces/NotificationData';
import Notification from './Notification';
import './NotificationContainer.css';

interface NotificationContainerProps {
    dismissibleNotifications: NotificationData[];
    nonDismissibleNotifications: NotificationData[];
    deleteNotification: (notificationData: NotificationData) => void;
}

function NotificationContainer(props: NotificationContainerProps) {

    return (
        <div className="notification-container">
            <div className="non-dismissible-notifications">
                {props.nonDismissibleNotifications.map(notification => {
                    return (
                        <Notification
                            key={notification.timestamp}
                            notificationData={notification}/>
                    )
                })}
            </div>
            <div className="dismissible-notifications">
                {props.dismissibleNotifications.map(notification => {
                    return (
                        <Notification
                            key={notification.timestamp}
                            notificationData={notification}
                            deleteNotification={props.deleteNotification} />
                    )
                })}
            </div>
        </div>
    )

}

export default NotificationContainer;