interface NotificationData {
  type: string;
  text: string;
  isDismissible: boolean;
  timestamp: number;
  autoDismissTimeout?: number;
}

export default NotificationData;
