
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { User } from "../../interfaces/User";
import '../UserPage.css';

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
    const [usersToShow, setUsersToShow] = useState([...props.users].sort((a, b) => {
        return lastNameAlphabetSort(a.lastName, b.lastName);
    }));

    const elementsDefinedByRole = {
        paymentButton: () => {
            return (
                props.roleId === Role.Manager
                &&
                <button>$</button>
            )
        }
    }

    const lastNameColumnOnClick = () => {
        setUsersToShow([...usersToShow.sort((a, b) => {
            return lastNameAlphabetSort(a.lastName, b.lastName);
        })])
        setSignInvertor(signInvertor + 1);
    }

    return (
        <div className="user-list">
            <div className="column-head">
                <button className="button-style" onClick={() => props.onEditClick()}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </div>
            <div className="user-list-head">
                <div className="column"> </div>
                <div className="column"><span title="А-Я" onClick={lastNameColumnOnClick}>фамилия</span></div>
                <div className="column"><span title="А-Я">имя</span></div>
                <div className="column"><span title="А-Я">логин</span></div>
                <div className="column"><span title="А-Я">роль</span></div>
            </div>
            {
                usersToShow.map(u => (
                    <div className="user-list-item" key={u.id}>
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
                        <div className="column">
                            <button className="button-style" onClick={() => props.onEditClick(u.id)}>
                                <FontAwesomeIcon icon="edit" />
                            </button>
                            <button className="button-style" onClick={() => props.onDeleteClick(u.id as number)}>
                                <FontAwesomeIcon icon="trash" />
                            </button>

                            {
                                elementsDefinedByRole.paymentButton()
                            }
                        </div>
                    </div>))
            }
        </div>
    )
}

export default UserList;