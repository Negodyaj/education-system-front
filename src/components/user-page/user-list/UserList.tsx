
import { useState } from "react";
import { Role } from "../../../enums/role";
import { User } from "../../interfaces/User";
import '../UserPage.css';

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
                <button>$</button>
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
            <button onClick={() => onEditClick()}>добавить пользователя</button>
            <div className="user-list-head">
                <div className="column"><span title="А-Я" onClick={secondNameSortDefaultAndOnclick}>фамилия</span></div>
                <div className="column"><span title="А-Я">имя</span></div>
                <div className="column"><span title="А-Я">логин</span></div>
                <div className="column"><span title="А-Я">роль</span></div>
                <div className="column"><span title="А-Я">группа</span></div>
                <div className="column"><span title="0-9">дата рождения</span></div>
            </div>
            {
                usersToShow.map(u => (
                    <div className="user-list-item" key={u.id}>
                        <div className="column break-word" lang="ru">{u.secondName}</div>
                        <div className="column break-word">{u.name}</div>
                        <div className="column">{u.login}</div>
                        <div className="column multiline">
                            {
                                u.role?.map(r => (<div>{r.label}</div>))
                            }
                        </div>
                        <div className="column">{u.groupName}</div>
                        <div className="column">{u.birthDate?.toLocaleDateString('ru')}</div>
                        <button onClick={() => onEditClick(u.id)}>ред.</button>
                        <button>удал.</button>
                        {
                            elementsDefinedByRole.paymentButton()
                        }
                    </div>))
            }
        </div>
    )
}

export default UserList;