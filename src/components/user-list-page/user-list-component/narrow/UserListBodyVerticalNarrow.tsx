import { useSelector } from "react-redux";
import { IRootState } from "../../../../store";
import { getEnToRuTranslation } from "../../../../shared/converters/enumToDictionaryEntity";
import { Role } from "../../../../enums/role";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import PaymentButton from "../../payment-form/PaymentButton";
import React from "react";
import { ACTIVE, NOT_ACTIVE } from "../../../../shared/styled-components/consts";
import OpenUserButton from "./buttons/OpenUserButton";
function UserListBodyVerticalNarrow() {
    const appState = useSelector((state: IRootState) => state);
    return (
        <React.Fragment>
            {
                appState.userListPage.userList.map(u => (
                    <div className="narrow user-list-item" key={u.id}>
                        <div className="header">
                            <div className="base-data">
                                <img className="user-photo" src={u.userPic} alt="userpic" />
                                <div>{u.lastName} {u.firstName}</div>
                            </div>
                            <div className="control">
                                <OpenUserButton userId={u.id} />
                            </div>
                        </div>
                        <div className={`content ${appState.userListPage.openedItemId === u.id ? ACTIVE : NOT_ACTIVE}`}>
                            <div className="row">
                                <div>Логин:</div>
                                <div>{u.login}</div>
                            </div>
                            <div className="row">
                                <div>Роли:</div>
                                <div>
                                    {
                                        u.roles.map(roleId => (
                                            <p>{getEnToRuTranslation(Role[roleId])}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="buttons">
                                <EditButton user={u} />
                                <DeleteButton user={u} />
                                {appState.roleSelector.currentUserRoleId === Role.Manager && <PaymentButton user={u} />}
                            </div>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    )
}
export default UserListBodyVerticalNarrow;
