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
                    props.roleId === Role.Student &&
                    <nav>
                        <NavLink exact activeClassName="active" to="/">
                        <span className="button-update"><FontAwesomeIcon icon="newspaper" /></span>
                            <span className="navigation"> Мои новости </span>
                        </NavLink>
                        <NavLink activeClassName="active" to="/groups-list" >
                        <span className="button-update"><FontAwesomeIcon icon="users" /></span>
                            <span className="navigation"> Мои группы </span>
                        </NavLink>
                        <NavLink activeClassName="active" to="/courses-list">
                        <span className="button-update"><FontAwesomeIcon icon="university" /></span>
                            <span className="navigation"> Мои курсы </span>
                        </NavLink>
                        <NavLink activeClassName="active" to="homework-list">
                        <span className="button-update"><FontAwesomeIcon icon="book-reader" /></span>
                            <span className="navigation"> Мои Домашки </span>
                        </NavLink>

                    </nav>
                }
                {
                    (props.roleId === Role.Admin || props.roleId === Role.Manager) &&
                    <nav>
                        <Link to="/user-list">
                        <span className="button-update"><FontAwesomeIcon icon="user" /></span>
                            <span className="navigation"> Users </span>
                        </Link>
                    </nav>
                }
                {
                    (props.roleId === Role.Teacher || props.roleId === Role.Methodist) &&
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