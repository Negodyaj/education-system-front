
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import PaymentForm from "../payment-form/PaymentForm";
import '../UserListPage.css';
import '../../../App.css'
import { User } from "../../../interfaces/User";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getUserToEditById } from "../../../store/user-page/thunk";
import { setPaymentFormOpen } from "../../../store/payment/action-creators";
import { sendDeleteRequestNoResponse } from "../../../services/http.service";
import { setUserForUserPageId } from "../../../store/user-page/action-creators";
import { Link } from "react-router-dom";
import { getUsers } from "../../../store/user-list-page/thunk";
import ConfirmationDialog from "../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { sendDeleteRequestNoResponse } from "../../../services/http.service";

function UserListComponent() {

    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)

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
    const [userForPayment, setUserForPayment] = useState<User | undefined>(undefined);
    const [paymentFormState, setPaymentFormState] = useState('');
    const [roleID, setRoleID] = useState(0);
    const [userID, setUserID] = useState(0);
    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmationDeleteMessage, setConfirmationDeleteMessage] = useState('Вы уверены?')

    const elementsDefinedByRole = {
        paymentButton: (user: User) => {
            return (
                appState.roleSelector.currentUserRoleId === Role.Manager
                &&
                <button className="button-round" onClick={() => onPaymentButtonClick(user)}>
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        },
        deleteRoleButton: (user: User, roleId: number) => {
            return (
                (appState.roleSelector.currentUserRoleId === Role.Admin && user.roles && user.roles.length > 1)
                &&
                <button className='button-round mini-button' onClick={() => onDeleteRoleClick(user, roleId)}>
                    <FontAwesomeIcon icon="times" />
                </button>
            )
        }

    }
    const onPaymentButtonClick = (userId: number | undefined) => {
        setPaymentFormState('visible');
        setUserForPayment([...userListPageState.userList].filter(u => u.id === userId)[0]);
        payment1.payment.formVisibility;

    }
    const onEditClick = (userToEditId: number) => {
        dispatch(setUserForUserPageId(userToEditId))
    }
    const onRegisterClick = () => {
    }

    const lastNameColumnOnClick = () => {
        // setUsersToShow(usersToShow.sort((a, b) => {
        //     return lastNameAlphabetSort(a.lastName, b.lastName);
        // }))
        setSignInvertor(signInvertor + 1);
    }

    const onDeleteRoleClick = (user: User, roleId: number) => {
        setUserID(user.id as number);
        setRoleID(roleId);
        setConfirmationDeleteMessage(`Вы точно хотите избавить пользователя ${user.lastName}( ${user.login}) от роли ${Role[roleId]}?`)
        setIsModalShow(true);
    }
    const refreshUser = () => {
        const newUsers = [...appState.userListPage.userList];
        const index = newUsers.findIndex(u => u.id === userID)
        newUsers[index] = { ...newUsers[index], roles: newUsers[index].roles?.filter(r => r !== roleID) };
        appState.userListPage.userList = newUsers;
    }


    const deleteRole = async (decision: boolean) => {
        if (decision) {
            if (await sendDeleteRequestNoResponse(`User/${userID}/role/${roleID}`))
                refreshUser();
        }
        setIsModalShow(false);
    }

    const onCancelPaymentClick = () => {
        setPaymentFormState('');
    }

    return (
        appState.userListPage.isDataLoading
            ?
            <div>LOADING</div>
            :
            
                <div className="user-list">
                    <div className="column-head">
                        <h4>Пользователи</h4>
                        <Link to="/user-page">
                            <button className="button-style" onClick={onRegisterClick}>
                                <FontAwesomeIcon icon="plus" />
                                <span> Добавить</span>
                            </button>
                        </Link>
                    </div>
                    <div className="list + user-list-head">
                        <div className="column"> </div>
                        <div className="column"><span title="А-Я" onClick={lastNameColumnOnClick}>фамилия</span></div>
                        <div className="column"><span title="А-Я">имя</span></div>
                        <div className="column"><span title="А-Я">логин</span></div>
                        <div className="column"><span title="А-Я">роль</span></div>
                    </div>
                    {
                        appState.userListPage.userList.map(u => (
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
                                            <div>{getEnToRuTranslation(Role[r])}</div>
                                            {elementsDefinedByRole.deleteRoleButton(u, r)}
                                            
                                        </div>))}
                                </div>
                                <div className="column">{/*u.groupName*/}</div>
                                <div className="column-button">
                                        <div className="column">
                                            <Link to="/user-page">
                                    <button className="button-round" onClick={() => onEditClick(u.id)}>
                                                <FontAwesomeIcon icon="edit" />
                                            </button>
                                        </Link>
                                        <button className="button-round" onClick={() => { }/*props.onDeleteClick(u.id as number)*/}>
                                            <FontAwesomeIcon icon="trash" />
                                        </button>

                                        {
                                            elementsDefinedByRole.paymentButton(u.id)
                                        }
                                {
                                    elementsDefinedByRole.paymentButton(u.id)
                                }
                            </div>
                        </div>
                        <ConfirmationDialog
                        isShown={isModalShow}
                        confirmLabel='Да'
                        declineLabel='Нет'
                        message={confirmationDeleteMessage}
                        title='Удаление роли'
                        callback={deleteRole}></ConfirmationDialog>
                    </div>))
            }
            <PaymentForm
                paymentFormState={paymentFormState}
                userForPayment={userForPayment}
            ></PaymentForm>
        </div>

    )
}

export default UserListComponent;