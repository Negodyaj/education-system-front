import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import { getGroup } from '../../../store/group-page/group-info-component/action-creaters';
import '../../../App.css';
import './GroupInfoComponent.css';

import BaseGroupInfoComponent from './base-group-info-component/BaseGroupInfoComponent';
import GroupMembersList from './group-members-list/GroupMembersList';
import { GroupBody, GroupInfoContainer } from './GroupInfoComponentStyled';

function GroupInfoComponent(props: { id: number }) {
  const { id } = props;

  const dispatch = useDispatch();
  const groupState = useSelector(
    (state: IRootState) => state.groupInfoComponent
  );

  useEffect(() => {
    dispatch(getGroup(id));
  }, []);

  return (
    <div>
      <GroupBody>
        <GroupInfoContainer>
          <BaseGroupInfoComponent
            courseName={groupState.groupToView.course.name}
            startDate={groupState.groupToView.startDate}
            duration={groupState.groupToView.course.duration}
            id={id}
          />
        </GroupInfoContainer>
        <GroupInfoContainer>
          <GroupMembersList
            students={groupState.groupToView.students}
            teachers={groupState.groupToView.teachers}
            tutors={groupState.groupToView.tutors}
          />
        </GroupInfoContainer>
      </GroupBody>
    </div>
  );
}

export default GroupInfoComponent;
