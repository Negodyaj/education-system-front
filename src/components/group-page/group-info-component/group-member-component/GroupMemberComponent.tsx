import './GroupMemberComponent.css';
import '../../../../App.css';

interface GroupMemberComponentProps {
  userPic: string;
  firstName: string;
  lastName: string;
  login: string;
}

function GroupMemberComponent(props: GroupMemberComponentProps) {
  const { userPic, firstName, lastName, login } = props;

  return (
    <div className="list">
      <div className="column">
        <img className="user-photo" src={userPic} alt="userpic" />
      </div>
      <div className="column">
        {firstName} {lastName}( {login})
      </div>
    </div>
  );
}

export default GroupMemberComponent;
