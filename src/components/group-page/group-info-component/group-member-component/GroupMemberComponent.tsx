import React from 'react';

import '../../../../App.css';
import { Column, Member } from '../GroupInfoComponentStyled';

interface GroupMemberComponentProps {
  userPic: string;
  firstName: string;
  lastName: string;
  login: string;
}

function GroupMemberComponent(props: GroupMemberComponentProps) {
  const { userPic, firstName, lastName, login } = props;

  return (
    <Member>
      <Column>
        <img className="user-photo" src={userPic} alt="userpic" />
      </Column>
      <Column>
        {firstName} {lastName} ({login})
      </Column>
    </Member>
  );
}

export default GroupMemberComponent;
