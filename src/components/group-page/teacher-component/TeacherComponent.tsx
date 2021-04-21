import './TeacherComponent.css'
import '../../../App.css'

interface TeacherComponentProps {
    userPic: string
    firstName: string
    lastName: string
    login: string
}

function TeacherComponent(props: TeacherComponentProps) {
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

export default TeacherComponent