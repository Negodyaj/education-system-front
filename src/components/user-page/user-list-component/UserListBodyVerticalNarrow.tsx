import { useSelector } from "react-redux";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import { IRootState } from "../../../store";
import DeleteButton from "./DeleteButton";
import DeleteRoleButton from "./DeleteRoleButton";
import EditButton from "./EditButton";
import PaymentButton from "./PaymentButton";
import './hamburgers.css';
import { MouseEventHandler, useRef, useState } from "react";
function UserListBodyVerticalNarrow() {
    const ACTIVE = "hamburger hamburger--elastic is-active";
    const NOT_ACTIVE = "hamburger hamburger--elastic";
    const appState = useSelector((state: IRootState) => state);
    const hamburgerOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        let isActiveClass = e.currentTarget.className;
        e.currentTarget.className = isActiveClass === ACTIVE ? NOT_ACTIVE : ACTIVE;
    }
    return (
        <>{
            appState.userListPage.userList.map(u => (
                <div className="list narrow-user-list-item" key={u.id}>
                    <div className="column">
                        <img className="user-photo" src={u.userPic} alt="userpic" />
                    </div>
                    <div className="column break-word" lang="ru">{u.lastName}</div>
                    <div className="column break-word">{u.firstName}</div>
                    <div className="column">
                        <button className={NOT_ACTIVE} type="button" name={u.lastName} onClick={hamburgerOnClick}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>

                </div>))}</>)
}
export default UserListBodyVerticalNarrow;