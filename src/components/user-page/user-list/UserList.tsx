
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { User } from "../../interfaces/User";
import PaymentForm from "../payment-form/PaymentForm";
import '../UserPage.css';
import '../../../App.css'
import NotificationData from "../../../shared/interfaces/NotificationData";
import { PaymentResponse } from '../../interfaces/PaymentResponse';
import { sendGetRequest } from "../../../services/http.service";
import { responseHandlers } from "../../../services/response-handler/responseHandler";
import { PaymentEnd } from "../../../shared/endpointConsts";
import { Console } from "node:console";

interface UserListProps {
    roleId: number;
    users: User[];
    onEditClick: (userToEditId?: number) => void;
    onDeleteClick: (userToDeleteId: number) => void;
    sendNotification: (newNotification: NotificationData | undefined) => void;
}

function UserList(props: UserListProps) {

    const lastNameAlphabetSort = (a: string, b: string) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (b > a) {
            return Math.pow(-1, signInvertor);
        }
        if (b < a) {
            return Math.pow(-1, signInvertor - 1);
        }
        return 0;
    }

    const [signInvertor, setSignInvertor] = useState(1);
    const [usersToShow, setUsersToShow] = useState([...props.users]);
    const [userForPayment, setUserForPayment] = useState<User | undefined>(undefined);
    const [paymentFormState, setPaymentFormState] = useState('');
    
    const elementsDefinedByRole = {
        paymentButton: (userId: number | undefined) => {
            return (
                props.roleId === Role.Manager
                &&
                <button className="button-round" onClick={() => onPaymentButtonClick(userId)}>
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        }
    }
    
    const onPaymentButtonClick = (userId: number | undefined) => {
        setUserForPayment([...usersToShow].filter(u => u.id === userId)[0]);
        setPaymentFormState('visible');
        //getPayment([...usersToShow].filter(u => u.id === userId)[0].id);
    }

    const onEditClick = (userToEditId?: number) => {
        props.onEditClick(userToEditId);
    }

    const lastNameColumnOnClick = () => {
        setUsersToShow(usersToShow.sort((a, b) => {
            return lastNameAlphabetSort(a.lastName, b.lastName);
        }))
        setSignInvertor(signInvertor + 1);
    }

    const onCancelPaymentClick = () => {
        setPaymentFormState('');
    }

    // const getPayment = async (userId?: number) => {
    //     setUserForPayment(await sendGetRequest<PaymentResponse[] | undefined>(
    //         'User' + '/' + userId + '/' + 'payment',
    //         props.sendNotification,
    //         responseHandlers[PaymentEnd]));
    //         //console.log('User' + '/' + userId + '/' + 'payment');
    //     //console.log((userPayment as PaymentResponse[])[0])
    // }

    return (
        <div className="user-list">
            <div className="column-head">
                <h4>Пользователи</h4>
                <button className="button-style" onClick={() => props.onEditClick()}>
                    <FontAwesomeIcon icon="plus" />
                    <span> Добавить</span>
                </button>
            </div>
            <div className="list + user-list-head">
                <div className="column"> </div>
                <div className="column"><span title="А-Я" onClick={lastNameColumnOnClick}>фамилия</span></div>
                <div className="column"><span title="А-Я">имя</span></div>
                <div className="column"><span title="А-Я">логин</span></div>
                <div className="column"><span title="А-Я">роль</span></div>
            </div>
            {
                usersToShow?.sort((a, b) => {
                    return lastNameAlphabetSort(a.lastName, b.lastName);
                }).map(u => (
                    <div className="list + user-list-item" key={u.id}>
                        <div className="column">
                            <img className="user-photo" src={u.userPic} alt="userpic" />
                        </div>
                        <div className="column break-word" lang="ru">{u.lastName}</div>
                        <div className="column break-word">{u.firstName}</div>
                        <div className="column">{u.login}</div>
                        <div className="column multiline">
                            {
                                u.roles?.map(r => (<div>{getEnToRuTranslation(Role[r])}</div>))
                            }
                        </div>
                        <div className="column">{/*u.groupName*/}</div>
                        <div className="column-button">
                            <div className="column">
                                <button className="button-round" onClick={() => props.onEditClick(u.id)}>
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                                <button className="button-round" onClick={() => props.onDeleteClick(u.id as number)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                {
                                    elementsDefinedByRole.paymentButton(u.id)
                                }
                            </div>
                        </div>
                    </div>))
            }
            <PaymentForm
                paymentFormState={paymentFormState}
                cancelClick={onCancelPaymentClick}
                sendNotification={props.sendNotification}
                userForPayment={userForPayment}
            ></PaymentForm>
        </div>

    )
}

export default UserList;