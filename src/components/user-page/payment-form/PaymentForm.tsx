import './PaymentForm.css'

interface PaymentProps {
    paymentFormState: string;
    cancelClick: () => void;
    userName?: string;
    userLastname?: string;
}


function PaymentForm(props: PaymentProps) {
    return (
        <div className={"payment " + (props.paymentFormState)}>
            <div className={"inner-payment " + (props.paymentFormState)}>
                <div className="header-payment">Назначить платеж {props.userName} {props.userLastname}</div>
                <form>
                    <div className="input-row">
                        <label>Сумма платежа</label>
                        <input></input>
                    </div>
                    <div className="input-row">
                        <label>Дата платежа</label>
                        <input></input>
                    </div>
                    <div className="input-row">
                        <label>Период оплаты</label>
                        <input></input>
                    </div>
                    <div className="input-row">
                        <label>Номер договора</label>
                        <input></input>
                    </div>
                </form>
                <div>
                    <button onClick={props.cancelClick}>Отмена</button>
                    <button>Подтвердить платеж</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm;
