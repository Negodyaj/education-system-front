import { sendPostRequest } from '../../../services/http.service';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import { convertPaymentToPaymentInput } from '../../../shared/converters/paymentToPaymentInput';
import { PaymentAddEnd } from '../../../shared/endpointConsts';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { Payment } from '../../interfaces/Payment';
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
    const payment = (newPayment: Payment) => {
    sendPostRequest<PaymentResponse>(
        'User' + '/' + props.userId + '/' + 'payment',
        props.sendNotification,
        responseHandlers[PaymentAddEnd],
        convertPaymentToPaymentInput(newPayment))
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
                <form>
                    <div className="input-row">
                        <label>Сумма платежа</label>
                        <input key = 'amount'></input>
                    </div>
                    <div className="input-row">
                        <label>Дата платежа</label>
                        <input key='date'></input>
                    </div>
                    <div className="input-row">
                        <label>Период оплаты</label>
                        <input key = 'period'></input>
                    </div>
                    <div className="input-row">
                        <label>Номер договора</label>
                        <input key='contractNumber'></input>
                    </div>
                    <div className="row input-row ">
                        <label>Оплачено полностью</label>
                        <input className="checkbox" type="checkbox" checked></input>
                    </div>
                </form>
                <div className="footer-payment">
                    <button className="button-select" onClick={props.cancelClick}>Отмена</button>
                    <button className="button-select" >Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm;
