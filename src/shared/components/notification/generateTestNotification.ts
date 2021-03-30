import NotificationData from "../../interfaces/NotificationData";

export function generateTestNotification(isDismissible: boolean): NotificationData {
    const randomType = function (): string {
        const num = Math.floor(Math.random() * 3);
        switch (num) {
            case 0:
                return 'information'
            case 1:
                return 'success'
            case 2:
                return 'error'
        }
        return '';
    }

    const type = randomType();

    return {
        type: type,
        text: `${type}: ${Math.floor(Math.random() * 1000000)}`,
        isDismissible: isDismissible,
        timestamp: Date.now(),
    }
}