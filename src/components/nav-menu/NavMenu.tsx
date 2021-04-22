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
                        <button className="button-update"><FontAwesomeIcon icon="newspaper" /></button>
                            <button className="navigation"> Мои новости </button>
                        </NavLink>
                        <NavLink activeClassName="active" to="/groups-list" >
                        <button className="button-update"><FontAwesomeIcon icon="users" /></button>
                            <button className="navigation"> Мои группы </button>
                        </NavLink>
                        <NavLink activeClassName="active" to="/courses-list">
                        <button className="button-update"><FontAwesomeIcon icon="university" /></button>
                            <button className="navigation"> Мои курсы </button>
                        </NavLink>
                        <NavLink activeClassName="active" to="homework-list">
                        <button className="button-update"><FontAwesomeIcon icon="book-reader" /></button>
                            <button className="navigation"> Мои Домашки </button>
                        </NavLink>

                    </nav>
                }
                {
                    (props.roleId === Role.Admin || props.roleId === Role.Manager) &&
                    <nav>
                        <Link to="/user-list">
                        <button className="button-update"><FontAwesomeIcon icon="user" /></button>
                            <button className="navigation"> Users </button>
                        </Link>
                    </nav>
                }
                {
                    (props.roleId === Role.Teacher || props.roleId === Role.Methodist) &&
                    <nav>
                        <Link to="/homework">
                        <button className="button-update"><FontAwesomeIcon icon="book-reader" /></button>
                            <button className="navigation"> Homeworks </button>
                        </Link>
                        <Link to="/courses-page">
                            <button className="button-update"> <FontAwesomeIcon icon="university" /> </button>
                            <button className="navigation"> Страница курсов </button>
                        </Link>
                    </nav>
                }
                {props.roleId !== Role.Student &&
                    <nav>

                        <NavLink activeClassName="active" to="/tags-page">
                        <button className="button-update"><FontAwesomeIcon icon="tag" /></button>
                            <button className="navigation"> Тэги </button>
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