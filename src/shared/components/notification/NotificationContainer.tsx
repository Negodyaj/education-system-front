import { useSelector } from 'react-redux';

import { IRootState } from '../../../store';

import './NotificationContainer.css';
import Notification from './Notification';

function NotificationContainer() {
  const appState = useSelector(
    (state: IRootState) => state.notificationContainer
  );

  return (
    <div className="notification-container">
      <div className="non-dismissible-notifications">
        {appState.notifications.nonDismissible.map((notification) => (
          <Notification
            key={notification.timestamp}
            notificationData={notification}
          />
        ))}
      </div>
      <div className="dismissible-notifications">
        {appState.notifications.dismissible.map((notification) => (
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
