import { Link } from 'react-router-dom';
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
                    <Link to="/">
                        <button> Мои новости </button></Link>
                    <Link to="/groups-list" >
                        <button> Мои группы </button></Link>
                    <Link to="/courses-list">
                        <button> Мои курсы </button></Link>
                    <Link to="homework-list">
                        <button> Мои Домашки </button></Link>
                </nav>
            }
            
        </div>
    )
}

export default NavMenu;