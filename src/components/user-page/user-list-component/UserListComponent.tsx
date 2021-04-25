import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import PaymentForm from "../payment-form/PaymentForm";
import '../UserListPage.css';
import '../../../App.css'
import { User } from "../../../interfaces/User";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { useHistory, useParams } from "react-router-dom";
import ConfirmationDialog from "../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { sendDeleteRequestNoResponse } from "../../../services/http.service";
import { deleteUserRequest } from "../../../store/user-list-page/thunk";

function UserListComponent() {

    const appState = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    const [userForPayment] = useState<User | undefined>(undefined);
    const [paymentFormState, setPaymentFormState] = useState('');
    const [roleID, setRoleID] = useState(0);
    const [userID, setUserID] = useState(0);
    const [isModalShow, setIsModalShow] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('Вы уверены?')
    const history = useHistory();
    const { id } = useParams<{ id?: string; }>();

    useEffect(() => {
        if (id) {
            setIsModalShow(true);
            let userToDelete = appState.userListPage.userList.filter(u => u.id === Number.parseInt(id))[0]
            setConfirmationMessage(`Вы действительно хотите удалить пользователя ${userToDelete.firstName} ${userToDelete.lastName}?`)
        }
    })

    const elementsDefinedByRole = {
        paymentButton: (userId: number | undefined) => {
            return (
                appState.roleSelector.currentUserRoleId === Role.Manager
                &&
                <button className="round-button" onClick={() => onPaymentButtonClick(userId)}>
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        },
        deleteRoleButton: (user: User, roleId: number) => {
            return (
                (appState.roleSelector.currentUserRoleId === Role.Admin && user.roles && user.roles.length > 1)
                &&
                <button className='round-button mini-button' onClick={() => onDeleteRoleClick(user, roleId)}>
                    <FontAwesomeIcon icon="times" />
                </button>
            )
        }
    }
    const onPaymentButtonClick = (userId: number | undefined) => {
        //setUserForPayment([...usersToShow].filter(u => u.id === userId)[0]);
        setPaymentFormState('visible');
    }
    const onEditClick = (userToEditId: number) => {
        history.push(`/user-page/${userToEditId}/edit`)
    }
    const deleteUser = (decision: boolean) => {
        if (decision) {
            dispatch(deleteUserRequest(id || "", history));
        } else {
            setIsModalShow(false);
        }
    }
    const onDeleteClick = (userToDelete: User) => {
        history.push(`/user-list/${userToDelete.id}`)
    }
    const [modalCallBack, setModalCallBack] = useState<(decision: boolean) => void>(deleteUser);
    const onRegisterClick = () => {
        history.push("/user-page/register");
    }
    const onDeleteRoleClick = (user: User, roleId: number) => {
        setUserID(user.id as number);
        setRoleID(roleId);
        setConfirmationMessage(`Вы точно хотите избавить пользователя ${user.lastName}( ${user.login}) от роли ${Role[roleId]}?`)
        setIsModalShow(true);
        setModalCallBack(deleteRole);
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
                    <button className="common-button" onClick={onRegisterClick}>
                        <FontAwesomeIcon icon="plus" />
                        <span> Добавить</span>
                    </button>
                </div>
                <div className="list + user-list-head">
                    <div className="column"> </div>
                    <div className="column"><span title="А-Я">фамилия</span></div>
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
                                    u.roles?.map(r => (
                                        <div className='role' key={r}>
                                            <div>{getEnToRuTranslation(Role[r])}</div>
                                            {elementsDefinedByRole.deleteRoleButton(u, r)}

                                        </div>
                                    ))}
                            </div>
                            <div className="column">{/*u.groupName*/}</div>
                            <div className="column-button">
                                <div className="column">
                                    <button className="round-button" onClick={() => onEditClick(u.id)}>
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                    <button className="round-button" onClick={() => onDeleteClick(u)}>
                                        <FontAwesomeIcon icon="trash" />
                                    </button>

                                    {
                                        elementsDefinedByRole.paymentButton(u.id)
                                    }
                                </div>
                            </div>
                            <ConfirmationDialog
                                isShown={isModalShow}
                                confirmLabel='Да'
                                declineLabel='Нет'
                                message={confirmationMessage}
                                title='Удаление роли'
                                callback={deleteUser}></ConfirmationDialog>
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