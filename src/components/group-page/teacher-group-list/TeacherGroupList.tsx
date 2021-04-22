import TeacherComponent from "../teacher-component/TeacherComponent"
import '../../../App.css'
import './TeacherGroupList.css'

const users = [
    {
        userPic: 'http://via.placeholder.com/350x150',
        firstName: 'Николай',
        lastName: 'Цискаридзе',
        login: 'ciskaridze777'
    },
    {
        userPic: 'http://via.placeholder.com/350x150',
        firstName: 'Николай',
        lastName: 'Цискаридзе',
        login: 'ciskaridze777'
    },
    {
        userPic: 'http://via.placeholder.com/350x150',
        firstName: 'Николай',
        lastName: 'Цискаридзе',
        login: 'ciskaridze777'
    }
]

export function TeacherGroupList() {
    return (
        <div>
            <div className='list-header'> Учителя:</div>
                <div className='list-group'>
                    {users.map(u => (
                        <TeacherComponent userPic={u.userPic}
                            lastName={u.lastName}
                            firstName={u.firstName}
                            login={u.login} />
                    ))}
                </div>
                <div className='list-header'> Студенты:</div>
                <div className='list-group'>
                    {users.map(u => (
                        <TeacherComponent userPic={u.userPic}
                            lastName={u.lastName}
                            firstName={u.firstName}
                            login={u.login} />
                    ))}
                </div>
            </div>
    )
}

export default TeacherGroupList