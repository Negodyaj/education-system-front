import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../interfaces/User';
import { sendDeleteRequest, sendGetRequest } from '../../services/http.service';
import { isUserArr } from '../../services/type-guards/userArray';
import ConfirmationDialog from '../../shared/components/confirmation-dialog/ConfirmationDialog';
import { IRootState } from '../../store';
import { getUsers } from '../../store/user-list-page/thunk';
import UserListComponent from './user-list-component/UserListComponent';
import UserPage from './user-page/UserPage';
import './UserListPage.css'

function UserListPage() {

    const url = 'User';
    const [usersInState, setUsersInState] = useState<User[] | undefined>();
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | undefined>();
    const [userToDeleteId, setUserToDeleteId] = useState<number>();
    const [isModalShown, setIsModalShown] = useState(false);
    const confirmationDeleteMessage = "Вы действительно хотите удалить пользователя?";
    const confirmationDeleteTitle = "Удаление пользователя";
    const confirmLabel = "Да";
    const declineLabel = "нет";

    const appState = useSelector((state: IRootState) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, []);
    const refreshUsers = () => {
        setUsersInState(undefined);
        getUsers();
    }
    const checkUpdatedUsers = () => {
        refreshUsers();
        setIsEditModeOn(false)
    }
    const getUserToUpdate = (userToEditId: number) => {
        //actualize user before UserEditForm rendering
    }
    const deleteUser = async (decision: boolean) => {
        // if (decision === true) {
        //     if (await sendDeleteRequest<UserDelete[]>(
        //         url + '/' + userToDeleteId,
        //         props.sendNotification,
        //         responseHandlers[UserUserDeleteIdEnd])) {
        //         refreshUsers()
        //     };
        // }
        // setIsModalShown(false)
    }
    const onEditClick = (userToEditId?: number) => {
        if (userToEditId) {
            setUserToEdit([...usersInState as User[]].filter(u => u.id === userToEditId)[0]);
        } else {
            setUserToEdit(undefined);
        }
        setIsEditModeOn(true);
    }
    const onDeleteClick = (userToDeleteIdArg: number) => {
        setUserToDeleteId(userToDeleteIdArg);
        setIsModalShown(true);
    }

    return (
        <div className="user-page">
            {
                appState.userListPage.isDataLoading
                    ?
                    <div>
                        <FontAwesomeIcon icon="spinner" />
                    </div>
                    :
                    <UserListComponent></UserListComponent>
            }
            <ConfirmationDialog
                isShown={isModalShown}
                confirmLabel={confirmLabel}
                declineLabel={declineLabel}
                message={confirmationDeleteMessage}
                title={confirmationDeleteTitle}
                callback={deleteUser}></ConfirmationDialog>
        </div>
    )
}
export default UserListPage;