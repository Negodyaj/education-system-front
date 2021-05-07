import './Notification.css';
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import NotificationData from '../../../interfaces/NotificationData';
import { removeNotification } from '../../../store/notifications/thunk';

interface NotificationProps {
  notificationData: NotificationData;
}

function Notification(props: NotificationProps) {
  const dispatch = useDispatch();
  // const deleteRef = useRef(dispatch(removeNotification));
  // deleteRef.current = dispatch(removeNotification);

  const notificationDomRef = useRef(null);
  const toggleHidden = () => {
    const elem = (notificationDomRef.current as unknown) as HTMLDivElement;
    elem.classList.toggle('hidden');
  };

  useEffect(() => {
    toggleHidden();
  }, []);

  const typeToTimeout = () => {
    switch (props.notificationData.type) {
      case 'information':
        return 6000;
      case 'success':
        return 3000;
      case 'warning':
        return 0;
      case 'error':
        return 0;
    }

    return 0;
  };

  let timeout = props.notificationData.autoDismissTimeout;

  if (timeout === undefined) {
    timeout = typeToTimeout();
  }

  useEffect(() => {
    if (timeout !== 0) {
      const timer = setTimeout(dismiss, timeout);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, []);

  const dismiss = () => {
    if (props.notificationData.isDismissible) {
      toggleHidden();
      setTimeout(() => {
        if (dispatch(removeNotification))
          dispatch(removeNotification(props.notificationData));
      }, 300);
    }
  };

  const typeToClassName = () => {
    switch (props.notificationData.type) {
      case 'information':
        return 'info-notification';
      case 'success':
        return 'success-notification';
      case 'warning':
        return 'warning-notification';
      case 'error':
        return 'error-notification';
    }

    return '';
  };

  const typeToIconName = () => {
    switch (props.notificationData.type) {
      case 'information':
        return 'info-circle';
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-circle';
      case 'error':
        return 'times-circle';
    }

    return 'info-circle';
  };

  return (
    <div
      className={`notification hidden
            ${typeToClassName()} `}
      ref={notificationDomRef}>
      <div className="type-icon">
        <FontAwesomeIcon icon={typeToIconName()} />
      </div>
      <span>{props.notificationData.text}</span>
      {props.notificationData.isDismissible && (
        <div className="close-btn-container">
          <button onClick={dismiss} className="close-btn">
            <FontAwesomeIcon icon="times" />
          </button>
          {timeout > 0 && (
            <svg className="circle-timer">
              <circle
                r="18"
                cx="20"
                cy="20"
                style={{ animationDuration: `${timeout}ms` }}
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
