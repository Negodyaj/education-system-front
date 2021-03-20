import { MouseEventHandler } from "react";
import { User } from "../../interfaces/User";
import './UserList.css';

interface UserListProps {
    users: User[];
}

function UserList(props: UserListProps) {

    return (
        <div className="user-list">
            {
                props.users.map(u => (
                <div className="user-list-item" key={u.id}>
                    <div className="column">{u.name}</div>
                    <div className="column">{u.secondName}</div>
                    <div className="column">{u.login}</div>
                    <div className="column">{
                        u.roleId.map(r =>(<span>{r}</span>))
                    }</div>
                    <div className="column">{u.groupName}</div>
                    <div className="column">{u.birthDate}</div>
                    <button>ред.</button>
                    <button>удалить</button>
                </div>))
            }
        </div>
    )
}

export default UserList;