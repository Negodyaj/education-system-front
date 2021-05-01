import { useSelector } from "react-redux";
import { Role } from "../../../../enums/role";
import { getEnToRuTranslation } from "../../../../shared/converters/enumToDictionaryEntity";
import { IRootState } from "../../../../store";
import EditButton from "../buttons/EditButton";
import PaymentButton from "../../payment-form/PaymentButton";
import DeleteRoleButton from "../buttons/DeleteRoleButton";
import DeleteButton from "../buttons/DeleteButton";
function UserListBodyWide() {
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
                    <div className="column">{u.login}</div>
                    <div className="column multiline">
                        {
                            u.roles?.map(r => (
                                <div className='role' key={r}>
                                    <div>{getEnToRuTranslation(Role[r])}</div>
                                    {
                                        appState.roleSelector.currentUserRoleId === Role.Admin && u.roles.length > 1
                                        &&
                                        <DeleteRoleButton user={u} roleId={r}></DeleteRoleButton>
                                    }
                                </div>
                            ))}
                    </div>
                    <div className="column">{/*u.groupName*/}</div>
                    <div className="column-button">
                        <div className="column">
                            <EditButton user={u} />
                            <DeleteButton user={u} />
                            {appState.roleSelector.currentUserRoleId === Role.Manager && <PaymentButton user={u} />}
                        </div>
                    </div>
                </div>))}</>)
}
export default UserListBodyWide;