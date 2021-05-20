import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { User } from '../../../interfaces/User';
import { IRootState } from '../../../store';
import { setPaymentFormOpen } from '../../../store/payment/action-creators';

import PaymentForm from './PaymentForm';

function PaymentButton(props: { user: User }) {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);

  const [paymentFormState, setPaymentFormState] = useState('');
  const [userForPayment] = useState<User | undefined>(undefined);

  const onCancelPaymentClick = () => {
    setPaymentFormState('');
  };

  const onPaymentButtonClick = (user: User) => {
    dispatch(setPaymentFormOpen(user));
    setPaymentFormState('visible');
  };

  return (
    <>
      <button
        className="button-round"
        onClick={() => onPaymentButtonClick(props.user)}>
        <FontAwesomeIcon icon="ruble-sign" />
      </button>
      <PaymentForm
        paymentFormState={paymentFormState}
        userForPayment={userForPayment}
      />
    </>
  );
}
export default PaymentButton;
