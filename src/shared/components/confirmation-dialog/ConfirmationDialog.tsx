import { useEffect, useState } from 'react';
import './ConfirmationDialog.css'
import ConfirmationDialogContent from "./ConfirmationDialogContent";

function ConfirmationDialog () {
    const isActive = true;
    return (
        isActive ?
        <div className = {`confirmation-dialog`}>
            <div className = "confirmation-dialog-overlay"> </div>
            <ConfirmationDialogContent />
        </div> :
        <></>
    )
}

export default ConfirmationDialog;
