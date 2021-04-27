import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { User } from "../../../interfaces/User";
import PaymentForm from "../payment-form/PaymentForm";

function PaymentButton(props: { userId: number | undefined }) {
    const [paymentFormState, setPaymentFormState] = useState('');
    const [userForPayment] = useState<User | undefined>(undefined);
    const onPaymentButtonClick = (userId: number | undefined) => {
        //setUserForPayment([...usersToShow].filter(u => u.id === userId)[0]);
        setPaymentFormState('visible');
    }
    const onCancelPaymentClick = () => {
        setPaymentFormState('');
    }
    return (
        <>
            <button className="round-button" onClick={() => onPaymentButtonClick(props.userId)}>
                <FontAwesomeIcon icon="ruble-sign" />
            </button>
            <PaymentForm
                paymentFormState={paymentFormState}
                cancelClick={onCancelPaymentClick}
                userName={userForPayment?.firstName}
                userLastname={userForPayment?.lastName}
            ></PaymentForm>
        </>
    )
}
export default PaymentButton;