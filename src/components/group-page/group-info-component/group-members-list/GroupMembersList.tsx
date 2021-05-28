import React from 'react';

import { User } from '../../../../interfaces/User';
import { useWindowSize } from '../../../../shared/hooks/useWindowSize';
import GroupMemberComponent from '../group-member-component/GroupMemberComponent';
import { GroupList, GroupMemberList, Title } from '../GroupInfoComponentStyled';

interface GroupMembersListProps {
  students: User[];
  teachers: User[];
  tutors: User[];
}

function GroupMembersList(props: GroupMembersListProps) {
  const { students, teachers, tutors } = props;

  return (
    <GroupList>
      <Title> Учителя:</Title>
      <GroupMemberList>
        {teachers.map((t) => (
          <GroupMemberComponent
            userPic={t.userPic}
            lastName={t.lastName}
            firstName={t.firstName}
            login={t.login}
          />
        ))}
      </GroupMemberList>
      <Title> Тьюторы:</Title>
      <GroupMemberList>
        {tutors.map((t) => (
          <GroupMemberComponent
            userPic={t.userPic}
            lastName={t.lastName}
            firstName={t.firstName}
            login={t.login}
          />
        ))}
      </GroupMemberList>
      <Title> Студенты:</Title>
      <GroupMemberList>
        {students.map((s) => (
          <GroupMemberComponent
            userPic={s.userPic}
            lastName={s.lastName}
            firstName={s.firstName}
            login={s.login}
          />
        ))}
      </GroupMemberList>
    </GroupList>
  );
}

export default GroupMembersList;
