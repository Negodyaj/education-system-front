
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { User } from "../../interfaces/User";
import PaymentForm from "../payment-form/PaymentForm";
import '../UserPage.css';
import '../../../App.css'
import ConfirmationDialog from "../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { sendDeleteRequest, sendDeleteRequestNoResponse } from "../../../services/http.service";
import NotificationData from "../../../shared/interfaces/NotificationData";
import { responseHandlers } from "../../../services/response-handler/responseHandler";
import { RoleDeleteEnd } from "../../../shared/endpointConsts";

interface UserListProps {
    roleId: number;
    users: User[];
    onEditClick: (userToEditId?: number) => void;
    onDeleteClick: (userToDeleteId: number) => void;
    refreshUsers: () => void;
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
    const [isModalShow, setIsModalShow] = useState(false)
    const [userForPayment, setUserForPayment] = useState<User | undefined>(undefined);
    const [paymentFormState, setPaymentFormState] = useState('');
    const [roleID, setRoleID] = useState(0);
    const [userID, setUserID] = useState(0);


    const elementsDefinedByRole = {
        paymentButton: (userId: number | undefined) => {
            return (
                props.roleId === Role.Manager
                &&
                <button className="button-round" onClick={() => onPaymentButtonClick(userId)}>
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        },
        deleteRoleButton: (user: User, roleId: number) => {
            let dis = true
            if(user.roles!= undefined && user.roles.length > 1) { dis = false}
            
            return (
             props.roleId === Role.Admin
                &&
                <button className='button-round mini-button' disabled={dis} onClick={() => onDeleteRoleClick(user, roleId)}>
                    <FontAwesomeIcon icon="times" />
                </button>
            )
        }
    }

    const onPaymentButtonClick = (userId: number | undefined) => {
        setUserForPayment([...usersToShow].filter(u => u.id === userId)[0]);
        setPaymentFormState('visible');

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
    const titleOnDelete = 'Удаление роли';
    const[ confirmationDeleteMessage, setConfirmationDeleteMessage] = useState('Вы уверены?')

    const confirmLabel = 'Да';
    const declineLabel = 'Нет';

    const onCancelPaymentClick = () => {
        setPaymentFormState('');
    }


    const onDeleteRoleClick = (user: User, roleId: number) => {
        setUserID(user.id as number);
        setRoleID(roleId);
        setConfirmationDeleteMessage ( "Вы точно хотите избавить пользователя " + user.lastName + '( ' + user.login + ')' + " от роли " + Role[roleId] + "? ")
        console.log(userID, roleID)
        setIsModalShow(true);
        console.log(user.lastName, user.login)
        console.log(confirmationDeleteMessage)

    }

    const deleteRole = (decision: boolean) => {
        if (decision) {
            //console.log()
            console.log('User' + '/' + userID + '/' + 'role' + '/' + roleID)
            sendDeleteRequestNoResponse('User' + '/' + userID + '/' + 'role' + '/' + roleID, props.sendNotification, responseHandlers[RoleDeleteEnd]);
            props.refreshUsers();
        }
        setIsModalShow(false);
    }

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
                                u.roles?.map(r => (<div className='role'>
                                    {elementsDefinedByRole.deleteRoleButton(u, r)}
                                    <div>{getEnToRuTranslation(Role[r])}</div>
                                </div>))
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
                        <ConfirmationDialog
                            isShown={isModalShow}
                            confirmLabel={confirmLabel}
                            declineLabel={declineLabel}
                            message={confirmationDeleteMessage}
                            title={titleOnDelete}
                            callback={deleteRole}></ConfirmationDialog>
                    </div>
                ))
            }
            <PaymentForm
                paymentFormState={paymentFormState}
                cancelClick={onCancelPaymentClick}
                userName={userForPayment?.firstName}
                userLastname={userForPayment?.lastName}
            ></PaymentForm>
        </div>

    )
}

export default UserList;