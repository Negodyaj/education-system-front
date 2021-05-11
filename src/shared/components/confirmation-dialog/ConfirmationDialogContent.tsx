import { ConfirmationDialogProps } from './ConfirmationDialog';

function ConfirmationDialogContent(props: ConfirmationDialogProps) {
  const { title, message, confirmLabel, declineLabel, callback } = props;
  const confirm = () => {
    callback(true);
  };

  const decline = () => {
    callback(false);
  };

  return (
    <div className="confirmation-dialog-content">
      <div className="confirmation-dialog-header">
        <h2>{title ?? 'Вы уверены?'}</h2>
      </div>
      <div className="confirmation-dialog-body">
        <span>{message ?? ''}</span>
      </div>
      <div className="confirmation-dialog-footer">
        <button onClick={decline}>{declineLabel ?? 'нет'}</button>
        <button onClick={confirm}>{confirmLabel ?? 'да'}</button>
      </div>
    </div>
  );
}

export default ConfirmationDialogContent;
