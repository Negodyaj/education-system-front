import NotificationData from "../../interfaces/NotificationData";
import { DELETE_NOTIFICATION, PUSH_NOTIFICATION } from "../actionTypes";
import { INotificationContainerState } from "../state";
import { NotificationContainerActions } from "./action-creators";

const initialState: INotificationContainerState = {
    notifications: {
        dismissible: [],
        nonDismissible: [],
    }
};
export function notificationContainerReducer(
    state: INotificationContainerState = initialState,
    action: NotificationContainerActions):
    INotificationContainerState {
    switch (action.type) {
        case PUSH_NOTIFICATION:
            if (action.payload.isDismissible) {
                return {
                    notifications: {
                        ...state.notifications,
                        dismissible: [...state.notifications.dismissible, action.payload],
                    }
                }
            } else {
                return {
                    notifications: {
                        ...state.notifications,
                        nonDismissible: [...state.notifications.nonDismissible, action.payload],
                    }
                }
            }
        case DELETE_NOTIFICATION:
            return {
                notifications: {
                    ...state.notifications,
                    dismissible: state.notifications.dismissible.filter(
                        notification => notification !== action.payload
                    )
                }
            }
        default:
            return state;
    }
}