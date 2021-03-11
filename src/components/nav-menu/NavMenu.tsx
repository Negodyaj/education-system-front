import { Link } from 'react-router-dom';
import './NavMenu.css'; 
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
                    <Link to="/homework">HomeworkMetodist</Link>
                </nav>
            }
            {
                props.roleId === 4 &&
                <nav>
                    <Link to="/homework">Homeworks</Link>
                </nav>
            }
            {
                props.roleId === 5 &&
                <nav>
                    <Link to="/homework">Homeworks</Link>
                </nav>
            }
        </div>
    )
}

export default NavMenu;