import { Link } from 'react-router-dom';
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
                props.roleId === 2 &&
                <nav>
                    <Link to="/user-cards">Link 3</Link>
                    <Link to="/custom-list">Link 4</Link>
                    <Link to="/homework">HomeworkTeacher</Link>
                </nav>
            }
        </div>
    )
}

export default NavMenu;