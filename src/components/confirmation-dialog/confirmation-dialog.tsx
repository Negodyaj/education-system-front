interface ConfirmationDialogProps{
    
}

function ConfirmationDialog(){
    return(
        <div className="cd-modal">
            <div className="cd-header"></div>
            <div className="cd-message">
                message
            </div>
            <div className="cd-buttons">
                <button>Yes</button> <button>No</button>
            </div>
        </div>
        
    )
}

export default ConfirmationDialog;