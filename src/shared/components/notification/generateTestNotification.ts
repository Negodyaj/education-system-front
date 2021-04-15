import { makeNotification } from "../../helpers/noficationHelpers";
import NotificationData from "../../../interfaces/NotificationData";

export function generateTestNotification(isDismissible: boolean): NotificationData {
    const randomType = function (): string {
        const num = Math.floor(Math.random() * 4);
        switch (num) {
            case 0:
                return 'information'
            case 1:
                return 'success'
            case 2:
                return 'warning'
            case 3:
                return 'error'
        }
        return '';
    }

    const type = randomType();

    return makeNotification(type, `${type}: ${Math.floor(Math.random() * 1000000)}`, isDismissible);
}