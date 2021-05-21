import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import { getGroupToViewById } from '../../../store/group-info-component/thunk';

import '../../../App.css';
import './GroupInfoComponent.css';

import BaseGroupInfoComponent from './base-group-info-component/BaseGroupInfoComponent';
import GroupMembersList from './group-members-list/GroupMembersList';

function GroupInfoComponent() {
  const dispatch = useDispatch();
  const { groupToView, isDataLoading, studentsGroup } = useSelector(
    (state: IRootState) => state.groupInfoComponent
  );

  useEffect(() => {
    dispatch(getGroupToViewById(14));
  }, []);

  return (
    <div>
      <div className="group-header"> Nav menu component</div>
      <div className="group-body">
        <div>
          <BaseGroupInfoComponent
            courseName={groupToView.course.name}
            startDate={groupToView.startDate}
            duration={groupToView.course.duration}
          />
        </div>
        <div>
          <GroupMembersList
            students={groupToView.students}
            teachers={groupToView.teachers}
            tutors={groupToView.tutors}
          />
        </div>
      </div>
    </div>
  );
}

export default GroupInfoComponent;
