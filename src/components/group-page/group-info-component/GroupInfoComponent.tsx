import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import { getGroupToViewById } from '../../../store/group-info-component/thunk';
import '../../../App.css';
import './GroupInfoComponent.css';
import Loader from '../../../shared/components/loader/Loader';

import BaseGroupInfoComponent from './base-group-info-component/BaseGroupInfoComponent';
import GroupMembersList from './group-members-list/GroupMembersList';

function GroupInfoComponent() {
  const dispatch = useDispatch();
  const { groupToView, isDataLoading } = useSelector(
    (state: IRootState) => state.groupInfoComponent
  );
  useEffect(() => {
    dispatch(getGroupToViewById(14));
  }, []);

  return (
    <div>
      {isDataLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default GroupInfoComponent;
