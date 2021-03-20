import './NotificationContainer.css';

function NotificationContainer() {
    const dismissibleNotifications = [
        {
            type: "information",
            text: 'Защита курса переносится на 24 сентября в 12.00!',
            isDismissible: true
        },
        {
            type: "success",
            text: 'Преподаватель принял вашу домашнюю работу "Циклы".',
            isDismissible: true
        },
        {
            type: "error",
            text: 'Ошибка',
            isDismissible: true
        },        
    ]

    const nonDismissibleNotifications = [
        {
            type: "information",
            text: 'Необходимо произвести оплату курса 15 сентября!',
            isDismissible: false
        },
    ]
    
    return (
        <div className="notification-container">
            <div className="non-dismissible-notifications"></div>
            <div className="dismissible-notifications"></div>
        </div>
    )

}



export default NotificationContainer;