
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
import { setUserRegisterMode } from "../../../store/user-page/action-creators";
import { Link } from "react-router-dom";

interface UserListComponentProps {
}

function UserListComponent(props: UserListComponentProps) {

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
    //const [usersToShow, setUsersToShow] = useState([...props.users]);
    const [userForPayment, setUserForPayment] = useState<User | undefined>(undefined);
    const [paymentFormState, setPaymentFormState] = useState('');

    const elementsDefinedByRole = {
        paymentButton: (userId: number | undefined) => {
            return (
                appState.roleSelector.currentUserRoleId === Role.Manager
                &&
                <button className="button-round" onClick={() => onPaymentButtonClick(userId)}>
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        }
    }

    const onPaymentButtonClick = (userId: number | undefined) => {
        //setUserForPayment([...usersToShow].filter(u => u.id === userId)[0]);
        setPaymentFormState('visible');

    }

    const onEditClick = (userToEditId: number) => {
        dispatch(getUserToEditById(userToEditId))
    }
    const onRegisterClick = () => {
        dispatch(setUserRegisterMode());
    }

    const lastNameColumnOnClick = () => {
        // setUsersToShow(usersToShow.sort((a, b) => {
        //     return lastNameAlphabetSort(a.lastName, b.lastName);
        // }))
        setSignInvertor(signInvertor + 1);
    }

    const onCancelPaymentClick = () => {
        setPaymentFormState('');
    }

    return (
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
                                u.roles?.map(r => (<div>{getEnToRuTranslation(Role[r])}</div>))
                            }
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
                            </div>
                        </div>
                    </div>))
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

export default UserListComponent;