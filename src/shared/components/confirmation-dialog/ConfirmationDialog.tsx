import { useEffect, useState } from 'react';
import './ConfirmationDialog.css'
import ConfirmationDialogContent from "./ConfirmationDialogContent";

export interface ConfirmationDialogProps {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

function ConfirmationDialog (props: ConfirmationDialogProps) {
    const [isHidden, setIsHidden] = useState(false); //меняется на true сразу же в useEffect
    useEffect(() => {
        setIsHidden(!isHidden);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isActive])

    if (props.isActive)
        return (
            <div className = {`confirmation-dialog ${isHidden ? "hidden" : ""}`}>
                <div className = "confirmation-dialog-overlay"> </div>
                <ConfirmationDialogContent {...props} />
            </div>
        )
    return null;
}

export default ConfirmationDialog;
