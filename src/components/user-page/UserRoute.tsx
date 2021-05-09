import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import {
  userEditUrl,
  userListUrl,
  userRegisterFormUrl,
} from '../../shared/consts';
import UserListPage from '../user-list-page/UserListPage';

import UserPage from './UserPage';

function UserRoute() {
  return (
    <>
      <Route exact path={`/${userListUrl}`}>
        <UserListPage />
        <Helmet>
          <title>Юзеры</title>
        </Helmet>
      </Route>
      <Route path={`/${userRegisterFormUrl}`}>
        <UserPage />
      </Route>
      <Route path={`/${userEditUrl}/:idToEdit/edit`}>
        <UserPage />
      </Route>
    </>
  );
}

export default UserRoute;
