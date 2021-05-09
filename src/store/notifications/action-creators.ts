import NotificationData from '../../interfaces/NotificationData';
import { PUSH_NOTIFICATION, DELETE_NOTIFICATION } from '../actionTypes';

export type NotificationContainerActions =
  | ReturnType<typeof pushNotification>
  | ReturnType<typeof deleteNotification>;

export function pushNotification(notification: NotificationData) {
  return {
    type: PUSH_NOTIFICATION,
    payload: notification,
  } as const;
}

export function deleteNotification(notification: NotificationData) {
  return {
    type: DELETE_NOTIFICATION,
    payload: notification,
  } as const;
}
