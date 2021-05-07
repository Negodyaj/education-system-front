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

interface PaymentProps {
  paymentFormState: string;
  userForPayment: User | undefined;
}

function PaymentForm(props: PaymentProps) {
  const paymentFormState = useSelector((state: IRootState) => state.payment);

  useEffect(() => {
    setValue(
      'contractNumber',
      paymentFormState.userForPayment?.contractNumber || 0
    );
    dispatch(getPayment(paymentFormState.userForPayment?.id));
  }, [paymentFormState.userForPayment]);

  const todate = new Date();
  const formattedDate = format(todate, 'dd.mm.yyyy');

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<PaymentInput>({
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
    <div className={`payment ${paymentFormState.formVisibility}`}>
      <div className={`inner-payment ${paymentFormState.formVisibility}`}>
        <div className="header-payment">
          <div>
            Назначить платеж пользователю
            <div>
              {paymentFormState.userForPayment?.firstName}{' '}
              {paymentFormState.userForPayment?.lastName}
            </div>
          </div>
          <button className="button-round" onClick={onCancel}>
            х
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-row">
              <label htmlFor="amount-id">
                Сумма платежа
                <input
                  id="amount-id"
                  key="amount"
                  {...register('amount', {
                    required: {
                      value: true,
                      message: 'Ведите сумму платежа',
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: 'Допустимы только цифры',
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="amount"
                  className="bad-feedback"
                  as="div"
                />
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="date-id">
                Дата платежа
                <input id="date-id" key="date" {...register('date')} />
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="period-id">
                Период оплаты
                <input
                  id="period-id"
                  key="period"
                  {...register('period', {
                    required: {
                      value: true,
                      message: 'Ведите период оплаты',
                    },
                    pattern: {
                      value: /\s\d/,
                      message: "Период формата 'янв 2010'",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="period"
                  className="bad-feedback"
                  as="div"
                />
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="contractNumber-id">
                Номер договора
                <input
                  id="contractNumber-id"
                  key="contractNumber" // value={paymentFormState.userForPayment?.contractNumber}
                  {...register('contractNumber', {
                    required: {
                      value: true,
                      message: 'Ведите номер договора',
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: 'Допустимы только цифры',
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="contractNumber"
                  className="bad-feedback"
                  as="div"
                />
              </label>
            </div>
            <div className="payment-history">
              <h4>История оплат:</h4>
              <div className="list payment-list-head">
                <span className="column">сумма</span>
                <span className="column">дата</span>
                <span className="column">период</span>
                <span className="column">номер</span>
              </div>
              <div className="payment-list-body">
                {paymentFormState.isDataLoading ? (
                  <>LOADING</>
                ) : (
                  paymentFormState.paymentList.map((item) => (
                    <div className="list" key={item.id}>
                      <div className="column">{item.amount}</div>
                      <div className="column">{item.date}</div>
                      <div className="column">{item.period}</div>
                      <div className="column">{item.contractNumber}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <p />
            <div className="footer-payment">
              <button
                className="button-select"
                type="button"
                onClick={onCancel}>
                Отмена
              </button>
              <button className="button-select" type="submit">
                Подтвердить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
