import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../enums/ChildIndex';
import { User } from '../../../interfaces/User';
import { IRootState } from '../../../store';
import { toggleModalWindow } from '../../../store/modal-window/action-creators';
import { getCurrentUser } from '../../../store/payment/action-creators';

function PaymentButton(props: { user: User }) {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);

  const onPaymentButtonClick = (user: User) => {
    dispatch(getCurrentUser(user));
  };

  return (
    <>
      <button
        className="round-button"
        onClick={() => onPaymentButtonClick(props.user)}>
        <FontAwesomeIcon icon="ruble-sign" />
      </button>
    </>
  );
}
export default PaymentButton;
