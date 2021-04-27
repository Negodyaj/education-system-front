import { useSelector } from "react-redux";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { IRootState } from "../../../store";
import DeleteButton from "./DeleteButton";
import DeleteRoleButton from "./DeleteRoleButton";
import EditButton from "./EditButton";
import PaymentButton from "./PaymentButton";
function UserListBodyVerticalNarrow() {
    const appState = useSelector((state: IRootState) => state);
    return (
        <>{
            appState.userListPage.userList.map(u => (
                <div className="list + user-list-item" key={u.id}>
                    <div className="column">
                        <img className="user-photo" src={u.userPic} alt="userpic" />
                    </div>
                    <div className="column break-word" lang="ru">{u.lastName}</div>
                    <div className="column break-word">{u.firstName}</div>
                    
                </div>))}</>)
}
export default UserListBodyVerticalNarrow;