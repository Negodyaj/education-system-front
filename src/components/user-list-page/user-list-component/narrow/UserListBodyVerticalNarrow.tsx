import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store";
import ChevronArrow from "../buttons/ChevronArrow";
import { openListItem } from "../../../../store/user-list-page/action-creators";
import { getEnToRuTranslation } from "../../../../shared/converters/enumToDictionaryEntity";
import { Role } from "../../../../enums/role";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
function UserListBodyVerticalNarrow() {
    const ACTIVE = "is-active";
    const NOT_ACTIVE = "";
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state);
    const hamburgerOnClick = (id: number) => {
        dispatch(openListItem(appState.userListPage.openedItemId === id ? 0 : id))
    }
    return (
        <>
            {
                appState.userListPage.userList.map(u => (
                    <div className="narrow user-list-item" key={u.id}>
                        <div className="header">
                            <img className="user-photo" src={u.userPic} alt="userpic" />
                            <div>{u.lastName}</div>
                            <div>{u.firstName}</div>
                        </div>
                        <div className="control">
                            <button
                                className={appState.userListPage.openedItemId === u.id ? ACTIVE : NOT_ACTIVE}
                                type="button"
                                onClick={() => hamburgerOnClick(u.id)}>
                                <ChevronArrow />
                            </button>
                        </div>
                        <div className={`content ${appState.userListPage.openedItemId === u.id ? ACTIVE : NOT_ACTIVE}`}>
                            <p>{u.login}</p>
                            <p>{u.roles.map(roleId => (
                                <div>{getEnToRuTranslation(Role[roleId])}</div>
                            ))}</p>
                            <p>
                                <span><EditButton user={u} /></span>
                                <span><DeleteButton user={u} /></span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default UserListBodyVerticalNarrow;