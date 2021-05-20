import { SubmitHandler, useForm } from 'react-hook-form';
import './PaymentForm.css';
import '../../../App.css';
import { ErrorMessage } from '@hookform/error-message';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { User } from '../../../interfaces/User';
import { IRootState } from '../../../store';
import { PaymentInput } from '../../interfaces/PaymentInput';
import { getPayment, sendPayment } from '../../../store/payment/thunk';
import {
  setPaymentFormCLose,
  setPaymentFormOpen,
} from '../../../store/payment/action-creators';
import ModalWindowCreateForm from '../../../shared/components/modal-window/ModalWindowCreateForm';
import { getPaymentFormElementSettings } from '../../../shared/helpers/useFormRegisterSettingByKey';

interface PaymentProps {
  paymentFormState: string;
  userForPayment: User | undefined;
}

function PaymentForm(props: PaymentProps) {
  const paymentFormState = useSelector((state: IRootState) => state.payment);

  useEffect(() => {
    paymentForm.setValue(
      'contractNumber',
      paymentFormState.userForPayment?.contractNumber || 0
    );
    dispatch(getPayment(paymentFormState.userForPayment?.id));
  }, [paymentFormState.userForPayment]);

  const todate = new Date();
  const formattedDate = format(todate, 'dd.mm.yyyy');

  const paymentForm = useForm<PaymentInput>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      amount: 2500,
      date: todate.toLocaleDateString('ru-RU'),
      period: '',
      contractNumber: paymentFormState.userForPayment?.contractNumber,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<PaymentInput> = (data: PaymentInput) => {
    dispatch(
      sendPayment(paymentFormState.userForPayment, {
        amount: +data.amount,
        date: data.date,
        period: data.period,
        contractNumber: +data.contractNumber,
      })
    );
  };

  const onCancel = () => {
    dispatch(setPaymentFormCLose());
  };

  return (
    <ModalWindowCreateForm
      form={paymentForm}
      closeHandler={onCancel}
      onSubmit={onSubmit}
      headerName="Оплата"
      objectKeysOnForm={paymentFormState.userForPayment}
      createFormElementOnType={getPaymentFormElementSettings}
    />
  );
}
export default PaymentForm;
