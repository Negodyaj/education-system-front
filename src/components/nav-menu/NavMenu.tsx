import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Role } from '../../enums/role';
import "./NavMenu.css"

interface NavMenuProps {
    roleId: number,
    onHide: (condition: boolean) => void
}

function NavMenu(props: NavMenuProps) {
    const [isHidden, setHidden] = useState(false);
    let title = "свернуть меню";

    let shangeHidden = () => {
        isHidden ? setHidden(false) : setHidden(true);
        props.onHide(isHidden);
    }

    return (
        <div className="menu-container">

            <div className={isHidden ? "notshow" : "vision"}>
                {
                    (props.roleId === Role.Student || props.roleId === Role.Teacher || props.roleId === Role.Tutor) &&
                    <NavLink activeClassName="active" to="/group-page" >
                        <span className="button-update"><FontAwesomeIcon icon="users" /></span>
                        <span className="navigation"> Мои группы </span>
                    </NavLink>
                }
                {
                    (props.roleId === Role.Admin || props.roleId === Role.Manager) &&
                    <nav>
                            <button className="button-update"><FontAwesomeIcon icon="user" /></button>
                            <button className="navigation"> Users </button>
                        <Link to="/user-list">
                        <span className="button-update"><FontAwesomeIcon icon="user" /></span>
                            <span className="navigation"> Users </span>
                        </Link>
                        <NavLink activeClassName="active" to="/group-page" >
                            <button className="button-update"><FontAwesomeIcon icon="users" /></button>
                            <button className="navigation"> Группы </button>
                        </NavLink>
                    </nav>
                }
                {
                    (props.roleId === Role.Teacher || props.roleId === Role.Methodist || props.roleId === Role.Tutor) &&
                    <nav>
                        <Link to="/homework">
                        <span className="button-update"><FontAwesomeIcon icon="book-reader" /></span>
                            <span className="navigation"> Homeworks </span>
                        </Link>
                        <Link to="/courses-page">
                            <span className="button-update"> <FontAwesomeIcon icon="university" /> </span>
                            <span className="navigation"> Страница курсов </span>
                        </Link>
                    </nav>
                }
                {props.roleId !== Role.Student &&
                    <nav>

                        <NavLink activeClassName="active" to="/tags-page">
                        <span className="button-update"><FontAwesomeIcon icon="tag" /></span>
                            <span className="navigation"> Тэги </span>
                        </NavLink>
                    </nav>
                }
            </div>
            <button className={isHidden ? "left button-update" : "right button-update"} onClick={shangeHidden} title={isHidden ? "развернуть меню" : "свернуть меню"}>
                <FontAwesomeIcon icon="angle-double-right" />
            </button>

        </div>
    )
}

export default NavMenu;