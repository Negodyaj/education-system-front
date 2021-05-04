import '../../../../App.css'
import './GroupMembersList.css'
import React from "react"
import GroupMemberComponent from '../group-member-component/GroupMemberComponent'
import { User } from '../../../../interfaces/User'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../store'
import { useEffect } from 'react'
import { getGroupToViewById } from '../../../../store/group-info-component/thunk'


export function GroupMembersList() {
    
    const groupState = useSelector((state: IRootState) => state.groupInfoComponent)
  

    return (
        <div className='group-members-list'>
            <div className='list-header'> Учителя:</div>
                <div className='list-group'>
                    {
                groupState.groupToView.teachers.map(t => (
                        <GroupMemberComponent userPic={t.userPic}
                            lastName={t.lastName}
                            firstName={t.firstName}
                            login={t.login} />
                    ))}
                </div>
                <div className='list-header'> Тьюторы:</div>
                <div className='list-group'>
                    {
                     groupState.groupToView.tutors.map(t => (
                        <GroupMemberComponent userPic={t.userPic}
                            lastName={t.lastName}
                            firstName={t.firstName}
                            login={t.login} />
                    ))}
                </div>
                <div className='list-header'> Студенты:</div>
                <div className='list-group'>
                    { groupState.groupToView.students.map(s => (
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