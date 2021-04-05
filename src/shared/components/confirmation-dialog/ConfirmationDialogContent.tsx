import { ConfirmationDialogProps } from "./ConfirmationDialog";

function ConfirmationDialogContent (props: ConfirmationDialogProps) {
    const confirm = () => {
        props.callback(true);
    }

    const decline = () => {
        props.callback(false);
    }

    return (
        <div className = "confirmation-dialog-content">
            <div className="confirmation-dialog-header">
                <h2>{props.title ?? "Вы уверены?"}</h2>
            </div>
            <div className="confirmation-dialog-body">
                <span>{props.message ?? ""}</span>
            </div>
            <div className="confirmation-dialog-footer">
                <button onClick={confirm}>{props.confirmLabel ?? "да"}</button>
                <button onClick={decline}>{props.declineLabel ?? "нет"}</button>
            </div>            
        </div>
    )
}

export default ConfirmationDialogContent;