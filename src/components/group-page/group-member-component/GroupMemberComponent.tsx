import './GroupMemberComponent.css'
import '../../../App.css'

interface GroupMemberComponentProps {
    userPic: string
    firstName: string
    lastName: string
    login: string
}

function GroupMemberComponent(props: GroupMemberComponentProps) {
    return (
        <div className='list'>
            <div className='column'>
                <img className="user-photo" src={props.userPic} alt="userpic" />
            </div>
            <div className='column'>
                {props.firstName} {props.lastName}( {props.login})
            </div>
        </div>
    )
}

export default GroupMemberComponent