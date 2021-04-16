import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { sendGetRequest, sendPostRequest } from '../../../services/http.service';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import {  PaymentAddEnd, PaymentEnd } from '../../../shared/endpointConsts';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { PaymentResponse } from '../../interfaces/PaymentResponse';
import './PaymentForm.css'
import '../../../App.css';
import { stringify } from 'node:querystring';
import { PaymentInput } from '../../interfaces/PaymentInput';
import { ErrorMessage } from '@hookform/error-message';
import { User } from '../../interfaces/User';
import { format } from 'date-fns';

interface PaymentProps {
    paymentFormState: string;
    cancelClick: () => void;
    sendNotification: (newNotification: NotificationData | undefined) => void;
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

    const sendPayment = (newPayment: PaymentInput) => {
        sendPostRequest<PaymentResponse>(
            `User/${props.userForPayment?.id}/payment`,
            props.sendNotification,
            responseHandlers[PaymentAddEnd],
            newPayment)
            
            console.log(newPayment)
    }
    //console.log(props.userPayment?.contractNumber)
    const onSubmit: SubmitHandler<PaymentInput> = (data: PaymentInput) => {
        sendPayment({
            amount: +data.amount,
            date: data.date,
            period: data.period,
            contractNumber: +data.contractNumber
        });
    }

    return (
        <div className={"payment " + (props.paymentFormState)}>
            <div className={"inner-payment " + (props.paymentFormState)}>
                <div className="header-payment">
                    <div>Назначить платеж пользователю
                        <div>{props.userForPayment?.firstName} {props.userForPayment?.lastName}</div>
                    </div>
                    <button className="button-round" onClick={props.cancelClick}>х</button>
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
                        <input key='contractNumber' value={props.userForPayment?.contractNumber}
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
                        <button className="button-select" type="button" onClick={props.cancelClick}>Отмена</button>
                        <button className="button-select" type={"submit"}>Подтвердить</button>
                    </div>
                </form>

            </div>
        </div >
    )
}

export default PaymentForm;
