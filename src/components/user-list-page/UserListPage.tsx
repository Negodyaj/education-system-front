import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../store';
import { getUsers } from '../../store/user-list-page/thunk';

import UserListComponent from './user-list-component/UserListComponent';
import './UserListPage.css';

function UserListPage() {
  const appState = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
      <div className="user-page">
          {
                appState.userListPage.isDataLoading
                    ?
                      <div>
                      <FontAwesomeIcon icon="spinner" />
        </div>
      ) : (
        <UserListComponent></UserListComponent>
      )}
    </div>
  );
}
export default UserListPage;
