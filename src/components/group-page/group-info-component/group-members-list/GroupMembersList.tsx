import '../../../../App.css'
import './GroupMembersList.css'
import React from "react"
import GroupMemberComponent from '../group-member-component/GroupMemberComponent'
import { User } from '../../../../interfaces/User'


interface GroupMembersListProps{
    students: User[]
    teachers: User[]
    tutors: User[]
}

export function GroupMembersList(props: GroupMembersListProps) {
    return (
        <div className='group-members-list'>
            <div className='list-header'> Учителя:</div>
                <div className='list-group'>
                    {
                    props.teachers.map(t => (
                        <GroupMemberComponent userPic={t.userPic}
                            lastName={t.lastName}
                            firstName={t.firstName}
                            login={t.login} />
                    ))}
                </div>
                <div className='list-header'> Тьюторы:</div>
                <div className='list-group'>
                    {
                    props.tutors.map(t => (
                        <GroupMemberComponent userPic={t.userPic}
                            lastName={t.lastName}
                            firstName={t.firstName}
                            login={t.login} />
                    ))}
                </div>
                <div className='list-header'> Студенты:</div>
                <div className='list-group'>
                    {props.students.map(s => (
                        <GroupMemberComponent userPic={s.userPic}
                            lastName={s.lastName}
                            firstName={s.firstName}
                            login={s.login} />
                    ))}
                </div>
            </div>
    )
}

export default GroupMembersList