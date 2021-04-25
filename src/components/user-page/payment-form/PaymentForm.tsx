import './PaymentForm.css'
//import '/App.css'

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
                <div className="header-payment">
                    <div>Назначить платеж пользователю
                        <div>{props.userName} {props.userLastname}</div>
                    </div>
                    <button className="round-button" onClick={props.cancelClick}>х</button>
                </div>
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
                    <div className="row input-row ">
                        <label>Оплачено полностью</label>
                        {/* <input className="checkbox" type="checkbox" checked></input> */}
                    </div>
                </form>
                <div className="footer-payment">
                    <button className="button-select" onClick={props.cancelClick}>Отмена</button>
                    <button className="button-select">Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm;
