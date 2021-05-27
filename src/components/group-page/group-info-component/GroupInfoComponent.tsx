import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { IRootState } from '../../../store';
import { getGroup } from '../../../store/group-page/group-info-component/action-creaters';
import '../../../App.css';
import './GroupInfoComponent.css';
import Loader from '../../../shared/components/loader/Loader';
import { getLessonsByGroup } from '../../../store/group-page/lesson/action-creators';

import BaseGroupInfoComponent from './base-group-info-component/BaseGroupInfoComponent';
import GroupMembersList from './group-members-list/GroupMembersList';

function GroupInfoComponent() {
  const dispatch = useDispatch();
  const groupState = useSelector(
    (state: IRootState) => state.groupInfoComponent
  );

  useEffect(() => {
    dispatch(getGroup(14));
  }, []);

  return (
    <div>
      <div className="group-body">
        <div>
          <BaseGroupInfoComponent
            courseName={groupState.groupToView.course.name}
            startDate={groupState.groupToView.startDate}
            duration={groupState.groupToView.course.duration}
          />
        </div>
        <div>
          <GroupMembersList
            students={groupState.groupToView.students}
            teachers={groupState.groupToView.teachers}
            tutors={groupState.groupToView.tutors}
          />
        </div>
      </div>
    </div>
  );
}

export default GroupInfoComponent;
