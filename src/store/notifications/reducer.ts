import NotificationData from "../../shared/interfaces/NotificationData";
import { INotificationContainerState } from "../state";

const initialState: INotificationContainerState = {
    dismissibleNotifications: [],
    nonDismissibleNotifications: [],
    sendNotification: function (this: INotificationContainerState, newNotification: NotificationData): void {
        if (!newNotification) return;
        if (newNotification.isDismissible) {
            this.dismissibleNotifications.push(newNotification);
        } else {
            this.nonDismissibleNotifications.push(newNotification);
        }
    },
    deleteNotification: function (this: INotificationContainerState, dismissedNotification: NotificationData): void {
        this.dismissibleNotifications = [...this.dismissibleNotifications].filter(
            notification => notification != dismissedNotification
        );
    }
};
export function coursePageReducer(state: INotificationContainerState = initialState, action: any): INotificationContainerState {
    switch (action.type) {
        default:
            return state;
    }
}