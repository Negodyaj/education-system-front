
import { SubmitHandler, useForm } from 'react-hook-form';
import './PaymentForm.css'
import '../../../App.css';
import { ErrorMessage } from '@hookform/error-message';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../interfaces/User';
import { IRootState } from '../../../store';
import { PaymentInput } from '../../interfaces/PaymentInput';
import { getPayment, sendPayment } from '../../../store/payment/thunk';
import { setPaymentFormCLose, setPaymentFormOpen } from '../../../store/payment/action-creators';
import { useEffect } from 'react';

interface PaymentProps {
    paymentFormState: string;
    userForPayment: User | undefined;
}


function PaymentForm(props: PaymentProps) {

    const paymentFormState = useSelector((state: IRootState) => state.payment)

    useEffect(() => {
        dispatch(getPayment(paymentFormState.userForPayment?.id));
    }, []);
    
    var todate = new Date();
    var formattedDate = format(todate, "dd.mm.yyyy");

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<PaymentInput>({
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            amount: 2500,
            date: todate.toLocaleDateString('ru-RU'),
            period: "",
            contractNumber: paymentFormState.userForPayment?.contractNumber
        }
    });

    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<PaymentInput> = (data: PaymentInput) => {
        dispatch(sendPayment(props.userForPayment, {
            amount: +data.amount,
            date: data.date,
            period: data.period,
            contractNumber: +data.contractNumber
        }))
    }

    const onCancel = () => {
        dispatch(setPaymentFormCLose())
    }



    return (
        <div className={"payment " + (paymentFormState.formVisibility)}>
            <div className={"inner-payment " + (paymentFormState.formVisibility)}>
                <div className="header-payment">
                    <div>Назначить платеж пользователю
                        <div>{paymentFormState.userForPayment?.firstName} {paymentFormState.userForPayment?.lastName}</div>
                    </div>
                    <button className="button-round" onClick={onCancel}>х</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <label>Сумма платежа</label>
                        <input key='amount' {...register("amount",
                            {
                                required: {
                                    value: true,
                                    message: "Ведите сумму платежа"
                                },
                                pattern: {
                                    value: /[0-9]/,
                                    message: "Допустимы только цифры"
                                }
                            }
                        )}></input>
                        <ErrorMessage
                            errors={errors}
                            name={'amount'}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="input-row">
                        <label>Дата платежа</label>
                        <input key='date' {...register("date",)}></input>
                    </div>
                    <div className="input-row">
                        <label>Период оплаты</label>
                        <input key='period' {...register("period",
                            {
                                required: {
                                    value: true,
                                    message: "Ведите период оплаты"
                                },
                                pattern: {
                                    value: /\s\d/,
                                    message: "Период формата 'янв 2010'"
                                }
                            }
                        )}></input>
                        <ErrorMessage
                            errors={errors}
                            name={'period'}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="input-row">
                        <label>Номер договора</label>
                        <input key='contractNumber' //value={paymentFormState.userForPayment?.contractNumber}
                            {...register("contractNumber",
                                {
                                    required: {
                                        value: true,
                                        message: "Ведите номер договора"
                                    },
                                    pattern: {
                                        value: /[0-9]/,
                                        message: "Допустимы только цифры"
                                    }
                                }
                            )}
                        ></input>
                        <ErrorMessage
                            errors={errors}
                            name={'contractNumber'}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className='payment-history'>
                        <h4>История оплат:</h4>
                        <div className="list payment-list-head">
                            <span>сумма</span>
                            <span>дата</span>
                            <span>период</span>
                            <span>номер</span>
                        </div>
                        <div className="list payment-list-body">
                            {
                                paymentFormState.isDataLoading
                                    ?
                                    <>LOADING</>
                                    :
                                    paymentFormState.paymentList?.map(item => (
                                        <div>
                                            <div>{item.amount}</div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <p></p>
                    <div className="footer-payment">
                        <button className="button-select" type="button" onClick={onCancel}>Отмена</button>
                        <button className="button-select" type={"submit"}>Подтвердить</button>
                    </div>
                </form>

            </div>

        </div >
    )
}

export default PaymentForm;
