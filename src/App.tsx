import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import NavMenu from './components/nav-menu/NavMenu';
import HomeworkPage from './components/homework-page/HomeworkPage';
import NotificationContainer from './shared/components/notification/NotificationContainer'
import CoursesPage from './components/courses-page/CoursesPage';
import CourseEdition from './components/courses-page/course-edition/CourseEdition';
import "./shared/fontawesome/FontawesomeIcons";
import { Role } from './enums/role';
import DevTestPage from './components/dev-test-page/DevTestPage';
import TagsPage from './components/tags-page/TagsPage';
import UserListPage from './components/user-page/UserListPage';
import { IRootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedOut } from './store/app/action-creators';
import LoginRoleSelector from './components/role-selector/LoginRoleSelector';
import { UNSELECTED_ROLE } from './shared/consts';
import { setRoleSelectorPending } from './store/role-selector/action-creator';

function App() {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    const history = useHistory();

    const logOut = () => {
        dispatch(setIsLoggedOut());
        dispatch(setRoleSelectorPending())
        history.push("/");
    }

    return (
        <div className="App">
            <header>
                <div className="logo-container">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className="header-user-actions">
                    {
                        (appState.app.isLoggedIn || appState.roleSelector.mode !== "pending")
                        &&
                        <button onClick={logOut}>Log out</button>
                    }
                </div>
            </header>
            <div className="main-content">
                <aside>
                    {
                        appState.app.isLoggedIn && <NavMenu roleId={appState.roleSelector.currentUserRoleId} />
                    }
                </aside>
                <main>
                    {
                        appState.app.isLoggedIn ?
                            <Switch>
                                {
                                    (appState.roleSelector.currentUserRoleId === Role.Manager || appState.roleSelector.currentUserRoleId === Role.Admin) &&
                                    <Route path="/user-page">
                                        <UserListPage roleId={appState.roleSelector.currentUserRoleId}></UserListPage>
                                    </Route>
                                }
                                {
                                    appState.roleSelector.currentUserRoleId === Role.Teacher &&
                                    <Route path="/courses-page">
                                        <CoursesPage />
                                    </Route>
                                }
                                <Route path="/course-edition/:id" render={({ location, history }) => (
                                    <CourseEdition idCourse={location.pathname} />)}>
                                </Route>
                                {
                                    appState.roleSelector.currentUserRoleId !== Role.Student &&
                                    <Route path="/tags-page">
                                        <TagsPage ></TagsPage>
                                    </Route>
                                }
                                <Route path="/homework">
                                    <HomeworkPage />
                                </Route>
                            </Switch>
                            :
                            <Switch>
                                {
                                    (!appState.app.isLoggedIn && appState.roleSelector.mode === "pending")
                                    &&
                                    <Route exact path="/">
                                        <LoginForm />
                                        <div className="test-page-link"><Link to="/dev-test-page">secret test page</Link></div>
                                    </Route>
                                }
                                <Route path="/dev-test-page">
                                    <DevTestPage />
                                    <NotificationContainer />
                                </Route>
                            </Switch>
                    }
                    {
                        appState.app.isLoggedIn && <NotificationContainer />
                    }
                    {
                        (appState.roleSelector.mode === "turnedOn" && !appState.app.isLoggedIn) && <LoginRoleSelector />
                    }
                </main>
            </div>
        </div>
    );
}

export default App;
