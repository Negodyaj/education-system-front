import { ConfirmationDialogProps } from "./ConfirmationDialog";

function ConfirmationDialogContent (props: ConfirmationDialogProps) {
    return (
        <div className = "confirmation-dialog-content">
            <div className="confirmation-dialog-header">
                <h2>Title</h2>
            </div>
            <div className="confirmation-dialog-body">
                <span>text</span>
            </div>
            <div className="confirmation-dialog-footer">
                <button>да</button>
                <button onClick={() => props.setIsActive(false)}>нет</button>
            </div>            
        </div>
    )
}

export default ConfirmationDialogContent;