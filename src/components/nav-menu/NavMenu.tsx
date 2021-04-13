import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Role } from '../../enums/role';
import "./NavMenu.css"
interface NavMenuProps {
    roleId: number
}

function NavMenu(props: NavMenuProps) {
    return (
        <div className="menu-container">
            {
                props.roleId === Role.Student &&
                <nav>
                    <NavLink exact activeClassName="active" to="/">
                        <button> Мои новости </button></NavLink>
                    <NavLink activeClassName="active" to="/groups-list" >
                        <button> Мои группы </button></NavLink>
                    <NavLink activeClassName="active" to="/courses-list">
                        <button> Мои курсы </button></NavLink>
                    <NavLink activeClassName="active" to="homework-list">
                        <button> Мои Домашки </button></NavLink>
                    
                </nav>
            }
            {
                (props.roleId === Role.Admin || props.roleId=== Role.Manager) &&
                <nav> 
                    <Link to="/user-page">Users</Link>
                </nav>
            }
            {
                (props.roleId === Role.Teacher  || props.roleId === Role.Methodist) &&
                <nav>
                    <Link to="/homework">Homeworks</Link>
                    <Link to="/courses-page">Страница курсов</Link>
                </nav>
            }
            { props.roleId !== Role.Student &&
                <nav>
                    <NavLink activeClassName="active" to="/tags-page">
                        <button> Тэги </button></NavLink>
                </nav>
            }
        </div>
    )
}

export default NavMenu;