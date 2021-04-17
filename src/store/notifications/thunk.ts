import { Dispatch } from "redux";
import NotificationData from "../../interfaces/NotificationData";
import { pushNotification, deleteNotification } from "./action-creators";

export const sendNotification = (notification: NotificationData) => {
    return (dispatch: Dispatch) => {
        dispatch(pushNotification(notification));
    }
}

export const removeNotification = (notification: NotificationData) => {
    return (dispatch: Dispatch) => {
        dispatch(deleteNotification(notification));
    }
}