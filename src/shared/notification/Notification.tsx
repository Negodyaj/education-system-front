import './Notification.css'

interface Notification {
    type: string;
    text: string;
    isDismissible: boolean;
}

function Notification(props: Notification) {
    return(
        <div className={`notification 
        ${props.type === "information" ? "info-notification" : ""}
        ${props.type === "success" ? "success-notification" : ""}
        ${props.type === "error" ? "error-notification" : ""}
        `}>
            <span>{props.text}</span>
            {
                props.isDismissible && <button className="close-btn">x</button>
            }
        </div>
    )
}

export default Notification;