import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { sendGetRequest, sendPostRequest } from '../../../services/http.service';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import { PaymentAddEnd, PaymentEnd } from '../../../shared/endpointConsts';
import { PaymentResponse } from '../../interfaces/PaymentResponse';
import './PaymentForm.css'
import '../../../App.css';
import { stringify } from 'node:querystring';
import { PaymentInput } from '../../interfaces/PaymentInput';
import { ErrorMessage } from '@hookform/error-message';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { sendPayment } from '../../../store/payment/thunk';
import NotificationData from '../../../interfaces/NotificationData';
import { User } from '../../../interfaces/User';
import { IRootState } from '../../../store';
import { setPaymentFormOpen } from '../../../store/payment/action-creators';

interface PaymentProps {
    paymentFormState: string;
    userForPayment: User | undefined;
}


function PaymentForm(props: PaymentProps) {

    var todate = new Date();
    var formattedDate = format(todate, "dd.mm.yyyy");

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<PaymentInput>({
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            amount: 2500,
            date: todate.toLocaleDateString('ru-RU'),
            period: "",
            contractNumber: props.userForPayment?.contractNumber
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
        //dispatch(setPaymentFormOpen())
    }


    const paymentFormState = useSelector((state: IRootState) => state.payment)

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
                        <input key='contractNumber' value={paymentFormState.userForPayment?.contractNumber}
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
                    {/* <div className="row input-row ">
                        <label>Оплачено полностью</label>
                        <input className="checkbox" type="checkbox" checked></input>
                    </div> */}
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
