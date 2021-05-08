import { Switch, Route, useHistory, Link, Redirect } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';

import NavMenu from './components/nav-menu/NavMenu';
import NotificationContainer from './shared/components/notification/NotificationContainer';
import CoursesPage from './components/courses-page/CoursesPage';
import CoursePage from './components/courses-page/course-page/CoursePage';
import CourseEdition from './components/courses-page/course-edition/CourseEdition';
import './shared/fontawesome/FontawesomeIcons';
import { Role } from './enums/role';
import DevTestPage from './components/dev-test-page/DevTestPage';
import TagsPage from './components/tags-page/TagsPage';
import { IRootState } from './store';
import { setIsLoggedOut } from './store/app/action-creators';
import GroupPage from './components/group-page/GroupPage';
import {
  toggleRoleSelector,
  unsetCurrentUser,
} from './store/role-selector/action-creator';
import { getToken, unsetToken } from './services/auth.service';
import Attendance from './components/group-page/attendance/Attendance';
import { ReactComponent as Logo } from './img/devedu.svg';
import Loader from './shared/components/loader/Loader';
import LessonsByGroup from './components/group-page/lesson-list-component/LessonsByGroup';
import { LoginRoleSelector } from './components/role-selector/LoginRoleSelector';
import LoginForm from './components/login-form/LoginForm';
import UserRoute from './components/user-page/UserRoute';
import GroupNavMenu from './components/group-page/group-nav-menu/GroupNavMenu';
import GroupInfoComponent from './components/group-page/group-info-component/GroupInfoComponent';


function App() {
  const dispatch = useDispatch();
  const { currentUserRoleId } = useSelector(
    (state: IRootState) => state.roleSelector
  );
  const history = useHistory();
  const [isHidden, setHidden] = useState(true);
  const logOut = () => {
    dispatch(setIsLoggedOut());
    dispatch(toggleRoleSelector());
    dispatch(unsetCurrentUser());
    unsetToken();
    history.push('/');
  };

  const onHide = (condition: boolean) => {
    setHidden(condition);
  };

  function styleMenu(condition: boolean) {
    if (condition) {
      return 'nothide';
    }

    return 'hide';
  }

  return (
    <div className="App">
      <Helmet>
        <title>Самый лучший сайт на свете</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <aside className={`left-section ${styleMenu(isHidden)}`}>
        <div className="logo-container">
          <Logo />
        </div>
        <div className="nav-menu">
          {!!getToken() && (
            <NavMenu roleId={currentUserRoleId} onHide={onHide} />
          )}
        </div>
      </aside>
      <div className="right-section">
        <div className="header-user-actions">
          {!!getToken() && <LoginRoleSelector />}
          {!!getToken() && (
            <button className="common-button" onClick={logOut}>
              Log out
            </button>
          )}
        </div>
        <main className="main-content">
          {getToken() ? (
            <Switch>
              {(currentUserRoleId === Role.Manager ||
                currentUserRoleId === Role.Admin) && <UserRoute />}
              {currentUserRoleId === Role.Teacher && (
                <Route path="/courses-page">
                  <CoursesPage />
                  <Helmet>
                    <title>Курсы</title>
                  </Helmet>
                </Route>
              )}
              <Route path="/course/:id/edition">
                <CourseEdition />
              </Route>
              <Route path="/course/:id">
                <CoursePage />
              </Route>
              {currentUserRoleId === Role.Teacher && (
                <Route path="/lessons">
                  <LessonsByGroup />
                  <Helmet>
                    <title>Занятия</title>
                  </Helmet>
                </Route>
              )}
              {currentUserRoleId !== Role.Student && (
                <Route path="/tags-page">
                  <TagsPage />
                  <Helmet>
                    <title>Тэги</title>
                  </Helmet>
                </Route>
              )}
              <Route path="/homework">
                <Helmet>
                  <title>Домашки</title>
                </Helmet>
              </Route>
              <Route exact path="/group">
                <Redirect to="/group/1" />
              </Route>
              <Route path="/group/:id">
                <GroupPage />
                <Helmet>
                  <title>Группы</title>
                </Helmet>
              </Route>
              <Route path="/attendance">
                <Attendance />
                <Helmet>
                  <title>Журнал в разработке</title>
                </Helmet>
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <LoginForm />
                <div className="test-page-link">
                  <Link to="/dev-test-page">secret test page</Link>
                </div>
                                    {appState.roleSelector.currentUserRoleId !== Role.Methodist &&
                                       <>
                                       <Route path="/group-page"  >
                                            <GroupNavMenu/>
                                            <Helmet>
                                                <title>Группы</title>
                                            </Helmet>
                                        </Route>
                                        <Route path="/group-page/info"  >
                                            <GroupInfoComponent/>
                                        </Route>
                                        <Route path="/group-page/lesson"  >
                                            <div>lesson</div>
                                        </Route>
                                        <Route path="/group-page/journal"  >
                                            <div>journal</div>
                                        </Route>
                                        <Route path="/group-page/statistics"  >
                                            <div>statistics</div>
                                        </Route>
                                       </> 
                                        }
              </Route>
              <Route path="/dev-test-page">
                <DevTestPage />
                <NotificationContainer />
              </Route>
            </Switch>
          )}
          <NotificationContainer />
        </main>
      </div>
      <Loader />
    </div>
  );
}

export default App;
