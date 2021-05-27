import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useRouteMatch } from 'react-router-dom';

import { Role } from '../../enums/role';
import { IRootState } from '../../store';

import Attendance from './attendance/Attendance';
import GroupInfoComponent from './group-info-component/GroupInfoComponent';
import GroupNavMenu from './group-nav-menu/GroupNavMenu';
import LessonsByGroup from './lesson-list-component/LessonsByGroup';

function GroupPage() {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // dispatch(getGroupToViewById(15))
  }, []);

  const { currentUserRoleId } = useSelector(
    (state: IRootState) => state.roleSelector
  );

  return (
    <div>
      {currentUserRoleId !== Role.Methodist && (
        <>
          <GroupNavMenu />
          <Route path={`${path}/info`}>
            <GroupInfoComponent id={+id} />
          </Route>
          <Route path={`${path}/lesson`}>
            <LessonsByGroup id={+id} />
          </Route>
          <Route path={`${path}/journal`}>
            <Attendance />
          </Route>
          <Route path={`${path}/statistics`}>
            <div>statistics</div>
          </Route>
        </>
      )}
    </div>
  );
}

export default GroupPage;
