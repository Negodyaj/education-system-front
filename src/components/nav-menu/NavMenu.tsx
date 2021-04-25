import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Role } from '../../enums/role';
import NavMenuDropdownLink from './components/NavMenuDropdownLink';
import NavMenuSimpleLink from './components/NavMenuSimpleLink';
import "./NavMenu.css"

interface NavMenuProps {
    roleId: number,
    onHide: (condition: boolean) => void
}

function NavMenu(props: NavMenuProps) {
    const [isHidden, setHidden] = useState(false);

    let changeHidden = () => {
        isHidden ? setHidden(false) : setHidden(true);
        props.onHide(isHidden);
    }

    return (
        <div className="menu-container">
            <nav className={isHidden ? "notshow" : "vision"}>
                {
                    (props.roleId === Role.Admin || props.roleId === Role.Manager) &&
                    <NavMenuSimpleLink route="user-list" faIcon="user" label="Пользователи"/>
                }
                {
                    (props.roleId === Role.Teacher || props.roleId === Role.Methodist) &&
                    <NavMenuSimpleLink route="homework" faIcon="book-reader" label="Домашки"/>
                }
                {
                    (props.roleId === Role.Teacher || props.roleId === Role.Methodist) &&
                    <NavMenuSimpleLink route="courses-page" faIcon="university" label="Курсы"/>
                }
                {
                    props.roleId !== Role.Student &&
                    <NavMenuSimpleLink route="tags-page" faIcon="tag" label="Тэги"/>
                }
                {
                    props.roleId == Role.Admin &&
                    <NavMenuDropdownLink route="group" faIcon="user" label="Группы"
                    dropdownLinks={[
                        {label:"one", routeParam: "1", showByDefault: true},
                        {label:"two", routeParam: "2", showByDefault: true},
                        {label:"three", routeParam: "3", showByDefault: false},
                        {label:"four", routeParam: "4", showByDefault: false},
                    ]}/>
                }
            </nav>
            <button className={isHidden ? "left button-update" : "right button-update"} onClick={changeHidden} title={isHidden ? "развернуть меню" : "свернуть меню"}>
                <FontAwesomeIcon icon="angle-double-right" />
            </button>

        </div>
    )
}

export default NavMenu;