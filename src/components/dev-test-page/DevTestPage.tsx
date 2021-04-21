import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles.css';
import ConfirmationDialog from "../../shared/components/confirmation-dialog/ConfirmationDialog";
import { generateTestNotification } from "../../shared/components/notification/generateTestNotification";
import NotificationData from "../../interfaces/NotificationData";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../store/notifications/thunk";
import CustomMultiSelect from "../multi-select/CustomMultiSelect";
import { SelectItem } from "../../interfaces/SelectItem";

interface DevTestPageProps {
}

function DevTestPage (props: DevTestPageProps) {
    const dispatch = useDispatch();
    const [dialogShown, setDialogShown] = useState(false);
    const [counter, setCounter] = useState(0);


    const counterCallback = (decision: boolean) => {
        if (decision) {
            setCounter(counter+1);
        }
        setDialogShown(false);
    }

    const selectItems:SelectItem[]= [
        {
            value: 1,
            label: "aaa"
        },
        {
            value: 2,
            label: "bbb"
        },
        {
            value: 3,
            label: "ccc"
        }
    ]

    return (
        <div>
            <h1>secret test page</h1>

            <div className="grid-container">
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
            </div>

            <section>
                <div className="section-item">
                    <div className="test-image">
                        <div className="image"></div>
                    </div>
                    <div className="item-content">
                        <h2>Some header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eaque repudiandae maiores soluta voluptates officia recusandae debitis! Quibusdam, recusandae eligendi provident magnam error voluptas explicabo architecto unde dolorem corporis officia!</p>
                    </div>
                </div>
                <div className="section-item">
                    <div className="item-content">
                        <h2>Some header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eaque repudiandae maiores soluta voluptates officia recusandae debitis! Quibusdam, recusandae eligendi provident magnam error voluptas explicabo architecto unde dolorem corporis officia!</p>
                    </div>
                    <div className="test-image">
                        <div className="image"></div>
                    </div>
                </div>
            </section>

            <div className="test-page-link"><Link to="/">back to login</Link></div>
        </div>
    )
}

export default DevTestPage;