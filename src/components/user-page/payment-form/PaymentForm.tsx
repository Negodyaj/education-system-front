import { useForm } from 'react-hook-form';
import { sendPostRequest } from '../../../services/http.service';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import { convertPaymentToPaymentInput } from '../../../shared/converters/paymentToPaymentInput';
import { PaymentAddEnd } from '../../../shared/endpointConsts';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { Payment } from '../../interfaces/Payment';
import { PaymentInput } from '../../interfaces/PaymentInput';
import { PaymentResponse } from '../../interfaces/PaymentResponse';
import './PaymentForm.css'
//import '/App.css'

interface PaymentProps {
    paymentFormState: string;
    cancelClick: () => void;
    userName?: string;
    userLastname?: string;
    userId?: number;
    sendNotification: (newNotification: NotificationData | undefined) => void;
}



function PaymentForm(props: PaymentProps) {

    const InitPayment: PaymentInput = {
        amount: "",
        date: Date(),
        period: "",
        contractNumber: "",
    }

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<PaymentInput>({
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: InitPayment
    });

    const sendPayment = (newPayment: PaymentInput) => {
        sendPostRequest<PaymentResponse>(
            'User' + '/' + props.userId + '/' + 'payment',
            props.sendNotification,
            responseHandlers[PaymentAddEnd],
            newPayment)
    }

    const onSubmit = (data: PaymentInput) => {
        sendPayment(data);
    }

    return (
        <div className={"payment " + (props.paymentFormState)}>
            <div className={"inner-payment " + (props.paymentFormState)}>
                <div className="header-payment">
                    <div>Назначить платеж пользователю
                        <div>{props.userName} {props.userLastname}</div>
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
                        <input key='contractNumber' {...register("contractNumber")}></input>
                    </div>
                    <div className="row input-row ">
                        <label>Оплачено полностью</label>
                        <input className="checkbox" type="checkbox" checked></input>
                    </div>
                    <div className="footer-payment">
                        <button className="button-select" onClick={props.cancelClick}>Отмена</button>
                        <button className="button-select" type={"submit"}>Подтвердить</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default PaymentForm;
