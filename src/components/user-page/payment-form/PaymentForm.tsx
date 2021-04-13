import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendGetRequest, sendPostRequest } from '../../../services/http.service';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import { PaymentAddEnd, PaymentEnd } from '../../../shared/endpointConsts';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { PaymentResponse } from '../../interfaces/PaymentResponse';
import './PaymentForm.css'
import '../../../App.css';
import { stringify } from 'node:querystring';
import { PaymentInput } from '../../interfaces/PaymentInput';

interface PaymentProps {
    paymentFormState: string;
    cancelClick: () => void;
    sendNotification: (newNotification: NotificationData | undefined) => void;
    userPayment: PaymentResponse | undefined;
}

function PaymentForm(props: PaymentProps) {

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<PaymentInput>({
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            amount: 2500,
            date: Date(),
            period: "",
            contractNumber: props.userPayment?.contractNumber
        }
    });

    const sendPayment = (newPayment: PaymentInput) => {
        sendPostRequest<PaymentResponse>(
            'User' + '/' + props.userPayment?.user?.id + '/' + 'payment',
            props.sendNotification,
            responseHandlers[PaymentAddEnd],
            newPayment)
            console.log(newPayment)
    }

    const onSubmit = (data: PaymentInput) => {
        sendPayment(data);
    }

    return (
        <div className={"payment " + (props.paymentFormState)}>
            <div className={"inner-payment " + (props.paymentFormState)}>
                <div className="header-payment">
                    <div>Назначить платеж пользователю
                        <div>{props.userPayment?.user?.firstName} {props.userPayment?.user?.lastName}</div>
                    </div>
                    <button className="button-round" onClick={props.cancelClick}>х</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <label>Сумма платежа</label>
                        <input key='amount' {...register("amount")}></input>
                    </div>
                    <div className="input-row">
                        <label>Дата платежа</label>
                        <input key='date' {...register("date")}></input>
                    </div>
                    <div className="input-row">
                        <label>Период оплаты</label>
                        <input key='period' {...register("period")}></input>
                    </div>
                    <div className="input-row">
                        <label>Номер договора</label>
                        <input key='contractNumber'
                            {...register("contractNumber")}
                        ></input>
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
