import { User } from '../../interfaces/User';
import './UserCard.css';

export interface UserCardProps {
    userData: User
}

function UserCard(props: UserCardProps) {
    return (
        <div className="user-card">
            <div>
                <span>{ props.userData.name } </span>
                <span>({ props.userData.email })</span>
                <hr />
                <span>{ props.userData.phone }</span>
            </div>
            <div>
                <p>Company: {props.userData.company.name}</p>
                <p>City: {props.userData.address.city} ({props.userData.address.zipcode})</p>
                <p>Address: {props.userData.address.street}, {props.userData.address.suite}</p>
            </div>
        </div>
    )
}

export default UserCard;