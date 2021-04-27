import '../../../App.css'
import './GroupMembersList.css'
import React from "react"
import GroupMemberComponent from '../group-member-component/GroupMemberComponent'

const users = [
    {
        userPic: 'http://via.placeholder.com/350x150',
        firstName: 'Николай',
        lastName: 'Цискаридзе',
        login: 'ciskaridze777'
    }
]

export function GroupMembersList() {
    return (
        <div>
            <div className='list-header'> Учителя:</div>
                <div className='list-group'>
                    {users.map(u => (
                        <GroupMemberComponent userPic={u.userPic}
                            lastName={u.lastName}
                            firstName={u.firstName}
                            login={u.login} />
                    ))}
                </div>
                <div className='list-header'> Студенты:</div>
                <div className='list-group'>
                    {users.map(u => (
                        <GroupMemberComponent userPic={u.userPic}
                            lastName={u.lastName}
                            firstName={u.firstName}
                            login={u.login} />
                    ))}
                </div>
            </div>
    )
}

export default GroupMembersList