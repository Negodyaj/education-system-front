import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Role } from '../../enums/role';
import "./NavMenu.css"
interface NavMenuProps {
    roleId: number
}


function NavMenu(props: NavMenuProps) {
    const [isHidden, setHidden] = useState(false);

let shangeHidden = () => {
    isHidden ? setHidden(false) : setHidden(true);
}
    return (
        <div className="menu-container">

        <div className={isHidden ? "hidden" : "vision"}>
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
            <button className={isHidden ? "left" : "right"} onClick={shangeHidden}> 
            <FontAwesomeIcon icon="angle-double-right"/>
            </button> 
        </div>
    )
}

export default NavMenu;