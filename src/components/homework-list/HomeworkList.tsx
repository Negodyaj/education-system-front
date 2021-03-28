import React from "react";
import NotificationData from "../../shared/interfaces/NotificationData";

interface HomeworkListProps {
    sendNotification: (newNotification: NotificationData) => void;
}

function HomeworkList(props: HomeworkListProps) {
    const send = () => {
        const notification: NotificationData = {
            type: "information",
            text: "test",
            isDismissible: true,
            timestamp: Date.now(),
        }
        props.sendNotification(notification);
    }

    return (
        <ul>
            <h2> Homeworks </h2>
            <button onClick={send}></button>
        </ul>
    )
}

export default HomeworkList;