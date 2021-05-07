import { useEffect, useState } from 'react';

import './ConfirmationDialog.css';
import ConfirmationDialogContent from './ConfirmationDialogContent';

export interface ConfirmationDialogProps {
  isShown: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  declineLabel?: string;
  callback: (decision: boolean) => void;
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { isShown } = props;

  return (
    <div className={`confirmation-dialog ${!isShown ? 'hidden' : ''}`}>
      <div className="confirmation-dialog-overlay"> </div>
      <ConfirmationDialogContent {...props} />
    </div>
  );
}

export default ConfirmationDialog;
