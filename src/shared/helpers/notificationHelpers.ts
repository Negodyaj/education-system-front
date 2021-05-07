import { WretcherError } from 'wretch';

import NotificationData from '../../interfaces/NotificationData';

export const makeErrorText = (error: any) =>
  (error as WretcherError).status.toString() ||
  `${'' + ' '}${(error as WretcherError).message}`;

export const makeNotification = (
  type: string,
  text?: string,
  isDismissible?: boolean,
  autoDismissTimeout?: number
): NotificationData => {
  const typeToTimeout = (type: string) => {
    switch (type) {
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

  const notification = {
    type,
    text: text ?? type,
    isDismissible: isDismissible ?? true,
    autoDismissTimeout: autoDismissTimeout ?? typeToTimeout(type),
    timestamp: Date.now(),
  };

  return notification;
};
