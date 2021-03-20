import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./NavMenu.css"
interface NavMenuProps {
    roleId: number
}

function NavMenu(props: NavMenuProps) {
    return (
        <div className="menu-container">
            {
                props.roleId === 1 &&
                <nav>
                    <Link to="/user-cards">User cards</Link>
                    <Link to="/custom-list">Custom list</Link>
                </nav>
            }
            {
                props.roleId === 2 &&
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
                props.roleId === 4 &&
                <nav> 
                    <Link to="/homework">Homeworks</Link>
                    <Link to="/user-page">Users</Link>
                </nav>
            }
            {
                props.roleId === 5 &&
                <nav>
                    <Link to="/homework">Homeworks</Link>
                    <Link to="/user-page">Users</Link>
                </nav>
            }
        </div>
    )
}

export default NavMenu;