
import { User } from "../../interfaces/User";
import '../UserPage.css';

interface UserListProps {
    users: User[];
    onEditClick:(editedUserId?:number)=>void;
}

function UserList(props: UserListProps) {

    const onEditClick = (editedUserId?:number) => {
        props.onEditClick(editedUserId);
    }

    return (
        <div className="user-list">
            <button onClick={()=>onEditClick()}>добавить пользователя</button>
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
                        <div className="column" lang="ru">{u.secondName}</div>
                        <div className="column">{u.name}</div>
                        <div className="column">{u.login}</div>
                        <div className="column">
                            {
                                u.role?.map(r => (<div>{r.roleName}</div>))
                            }
                        </div>
                        <div className="column">{u.groupName}</div>
                        <div className="column">{u.birthDate}</div>
                        <button onClick={()=>onEditClick(u.id)}>ред.</button>
                        <button>удал.</button>
                        <button>$</button>
                    </div>))
            }
        </div>
    )
}

export default UserList;