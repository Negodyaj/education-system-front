
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { User } from "../../interfaces/User";
import '../UserPage.css';
import '../../../App.css'
import ConfirmationDialog from "../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { sendDeleteRequest } from "../../../services/http.service";

interface UserListProps {
    roleId: number;
    users: User[];
    onEditClick: (userToEditId?: number) => void;
    onDeleteClick: (userToDelete: number) => void;
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

    const elementsDefinedByRole = {
        paymentButton: () => {
            return (
                props.roleId === Role.Manager
                &&
                <button className="button-round">
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        },
        deleteRoleButton: (userId: number|undefined, roleId: number) => {
            const currentUserId = userId;
    
            return (
                props.roleId === Role.Admin
                &&
                <button className='button-round mini-button' onClick={() => onDeleteRoleClick(userId, roleId)}>x</button>
            )
        }
    }

    const lastNameColumnOnClick = () => {
        setUsersToShow(usersToShow.sort((a, b) => {
            return lastNameAlphabetSort(a.lastName, b.lastName);
        }))
        setSignInvertor(signInvertor + 1);
    }
    const titleOnDelete = 'Удаление роли';
    const messageOnDelete = "Вы уверены?";
    const confirmLabel = 'Yes';
    const declineLabel = 'No';

    const onDeleteRoleClick = (userId: number|undefined, roleId: number) => {
        
        setIsModalShow(true);
        console.log('uuu')
    }

    const deleteRole = (decision: boolean) => {
        if(true){
            
        alert('delete')
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
                                    {elementsDefinedByRole.deleteRoleButton(u.id, r )}
                                    <div>{getEnToRuTranslation(Role[r])}</div>
                                </div>))
                            }
                        </div>
                        <div className="column">{u.groupName}</div>
                        <div className="column-button">
                            <div className="column">
                                <button className="button-round" onClick={() => props.onEditClick(u.id)}>
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                                <button className="button-round" onClick={() => props.onDeleteClick(u.id as number)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>

                                {
                                    elementsDefinedByRole.paymentButton()
                                }

                            </div>
                        </div>
                        <ConfirmationDialog
                            isShown={isModalShow}
                            confirmLabel={confirmLabel}
                            declineLabel={declineLabel}
                            message={messageOnDelete}
                            title={titleOnDelete}
                            callback={deleteRole}></ConfirmationDialog>
                    </div>
                ))
            }
        </div>

    )
}

export default UserList;