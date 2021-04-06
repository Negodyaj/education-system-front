
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { User } from "../../interfaces/User";
import '../UserPage.css';
import '../../../App.css'

interface UserListProps {
    roleId: number;
    users: User[];
    onEditClick: (userToEditId?: number) => void;
}

function UserList(props: UserListProps) {

    const [signInvertor, setSignInvertor] = useState(2);
    const [usersToShow, setUsersToShow] = useState([...props.users]);

    const elementsDefinedByRole = {
        paymentButton: () => {
            return (
                props.roleId === Role.Manager
                &&
                <button className="button-icon-style">
                    <FontAwesomeIcon icon="ruble-sign" />
                </button>
            )
        }
    }


    const onEditClick = (userToEditId?: number) => {
        props.onEditClick(userToEditId);
    }

    const secondNameSortDefaultAndOnclick = () => {
        setUsersToShow([...usersToShow.sort((a, b) => {
            if (a.secondName !== undefined && b.secondName !== undefined) {
                if (b.secondName > a.secondName) {
                    return Math.pow(-1, signInvertor - 1);
                }
                if (b.secondName < a.secondName) {
                    return Math.pow(-1, signInvertor);
                }
            }
            return 0;
        })])
        setSignInvertor(signInvertor + 1);
    }

    if (signInvertor < 3) {
        secondNameSortDefaultAndOnclick();
    }

    return (
        <div className="user-list">
            <div className="column-head">
                <h4>Пользователи</h4>
                <button className="button-style" onClick={() => onEditClick()}>
                    <FontAwesomeIcon icon="plus" />
                    <span> Добавить</span> 
                </button>
            </div>
            <div className="list + user-list-head">
                <div className="column"> </div>
                <div className="column"><span title="А-Я" onClick={secondNameSortDefaultAndOnclick}>Фамилия</span></div>
                <div className="column"><span title="А-Я">Имя</span></div>
                <div className="column"><span title="А-Я">Логин</span></div>
                <div className="column"><span title="А-Я">Роль</span></div>
                <div className="column"><span title="А-Я">Группа</span></div>
            </div>
            {
                usersToShow.map(u => (
                    <div className="list + user-list-item" key={u.id}>
                        <div className="column">
                            <img className="user-photo" src={u.userPic} alt="userpic" />
                        </div>
                        <div className="column break-word" lang="ru">{u.secondName}</div>
                        <div className="column break-word">{u.name}</div>
                        <div className="column">{u.login}</div>
                        <div className="column multiline">
                            {
                                u.role?.map(r => (<div>{r.label}</div>))
                            }
                        </div>
                        <div className="column">{u.groupName}</div>
                        <div className="column-button">
                            {
                                elementsDefinedByRole.paymentButton()
                            }
                            <button className="button-round" onClick={() => onEditClick(u.id)}>
                                <FontAwesomeIcon icon="edit" />
                            </button>
                            <button className="button-round">
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </div>
                    </div>))
            }
        </div>
    )
}

export default UserList;