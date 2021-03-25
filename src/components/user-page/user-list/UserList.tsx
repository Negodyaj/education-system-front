
import { Roles } from "../../../shared/components/roles/Roles";
import { User } from "../../interfaces/User";
import '../UserPage.css';

interface UserListProps {
    roleId: number;
    users: User[];
    onEditClick: (userToEditId?: number) => void;
}

function UserList(props: UserListProps) {

    const elementsDefinedByRole = {
        paymentButton: () => {
            return (
                props.roleId === Roles.filter(role => { return role.name === "менеджер" })[0].id
                &&
                <button>$</button>
            )
        }
    }

    const onEditClick = (userToEditId?: number) => {
        props.onEditClick(userToEditId);
    }

    return (
        <div className="user-list">
            <button onClick={() => onEditClick()}>добавить пользователя</button>
            <div className="user-list-head">
                <div className="column"><span title="А-Я">фамилия</span></div>
                <div className="column"><span title="А-Я">имя</span></div>
                <div className="column"><span title="А-Я">логин</span></div>
                <div className="column"><span title="А-Я">роль</span></div>
                <div className="column"><span title="А-Я">группа</span></div>
                <div className="column"><span title="0-9">дата рождения</span></div>
            </div>
            {
                props.users.map(u => (
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