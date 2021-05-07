import Notification from './Notification';

import './NotificationContainer.css';
import { useSelector } from 'react-redux';

import { IRootState } from '../../../store';

function NotificationContainer() {
  const state = useSelector((state: IRootState) => state.notificationContainer);

  return (
    <div className="notification-container">
      <div className="non-dismissible-notifications">
        {state.notifications.nonDismissible.map((notification) => (
          <Notification
            key={notification.timestamp}
            notificationData={notification}
          />
        ))}
      </div>
      <div className="dismissible-notifications">
        {state.notifications.dismissible.map((notification) => (
          <Notification
            key={notification.timestamp}
            notificationData={notification}
          />
        ))}
      </div>
    </div>
  );
}
export default NotificationContainer;
