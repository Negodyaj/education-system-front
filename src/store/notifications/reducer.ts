import NotificationData from "../../interfaces/NotificationData";
import { DELETE_NOTIFICATION, PUSH_NOTIFICATION } from "../actionTypes";
import { INotificationContainerState } from "../state";
import { NotificationContainerActions } from "./action-creators";

const initialState: INotificationContainerState = {
    dismissibleNotifications: [],
    nonDismissibleNotifications: []
};
export function notificationContainerReducer(
    state: INotificationContainerState = initialState,
    action: NotificationContainerActions):
    INotificationContainerState {
    switch (action.type) {
        case PUSH_NOTIFICATION:
            if (action.payload.isDismissible) {
                return {
                    ...state,
                    dismissibleNotifications: [...state.dismissibleNotifications, action.payload]
                }
            } else {
                return {
                    ...state,
                    nonDismissibleNotifications: [...state.nonDismissibleNotifications, action.payload]
                }
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                dismissibleNotifications: state.dismissibleNotifications.filter(
                    notification => notification !== action.payload 
                )
            }
        default:
            return state;
    }
}