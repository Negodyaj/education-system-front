import logo from './logo.svg';
import './App.css';
import { Switch, Route, useHistory, Link, Redirect } from 'react-router-dom';
import Router from 'react-router'
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
import UserListPage from './components/user-list-page/UserListPage';
import { IRootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedOut } from './store/app/action-creators';
import LoginRoleSelector from './components/role-selector/LoginRoleSelector';
import GroupPage from './components/group-page/GroupPage';
import { Helmet } from "react-helmet";
import { toggleRoleSelector, unsetCurrentUser } from './store/role-selector/action-creator';
import { getToken, unsetToken } from './services/auth.service';
import Attendance from './components/group-page/attendance/Attendance';
import React, { useState } from 'react';
import { userEditUrl, userListUrl, userRegisterFormUrl } from './shared/consts';
import UserPage from './components/user-page/UserPage';
import { ReactComponent as Logo } from './img/devedu.svg';
import Loader from './shared/components/loader/Loader';
import LessonsByGroup from './components/group-page/lesson-list-component/LessonsByGroup';
import CoursePage from './components/courses-page/course-page/CoursePage';

function App() {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    const history = useHistory();
    const [isHidden, setHidden] = useState(true);
    const logOut = () => {
        dispatch(setIsLoggedOut());
        dispatch(toggleRoleSelector());
        dispatch(unsetCurrentUser());
        unsetToken();
        history.push("/");
    }


    const onHide = (condition: boolean) => {
        setHidden(condition);
    }

    function styleMenu(condition: boolean) {
        if (condition) { return ("nothide") } else { return ("hide") }
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
                    {
                        !!getToken()
                        &&
                        <NavMenu roleId={appState.roleSelector.currentUserRoleId} onHide={onHide} />
                    }
                </div>
            </aside>
            <div className="right-section">
                <div className="header-user-actions">
                    {
                        !!getToken() && <LoginRoleSelector />
                    }
                    {
                        !!getToken()
                        &&
                        <button className='common-button' onClick={logOut}>Log out</button>
                    }
                </div>
                <main className="main-content">
                    {
                        !!getToken() ?
                            <>
                                <Switch>
                                    {
                                        (appState.roleSelector.currentUserRoleId === Role.Manager
                                            ||
                                            appState.roleSelector.currentUserRoleId === Role.Admin)
                                        &&
                                        <>
                                            <Route exact path={`/${userListUrl}`}>
                                                <UserListPage></UserListPage>
                                                <Helmet>
                                                    <title>Юзеры</title>
                                                </Helmet>
                                            </Route>
                                            <Route path={`/${userRegisterFormUrl}`}>
                                                <UserPage></UserPage>
                                            </Route>
                                            <Route path={`/${userEditUrl}/:idToEdit/edit`}>
                                                <UserPage></UserPage>
                                            </Route>
                                        </>
                                    }
                                    {
                                        appState.roleSelector.currentUserRoleId === Role.Teacher &&
                                        <Route path="/courses-page">
                                            <CoursesPage />
                                            <Helmet>
                                                <title>Курсы</title>
                                            </Helmet>
                                        </Route>
                                    }
                                    {/* <Route path="/course/:id/edition" children={<CourseEdition />} /> */}
                                    <Route path="/course/:id" children={<CoursePage />} />
                                    {
                                        appState.roleSelector.currentUserRoleId === Role.Teacher &&
                                        <Route path="/lessons">
                                            <LessonsByGroup />
                                            <Helmet>
                                                <title>Занятия</title>
                                            </Helmet> 
                                        </Route>
                                    }
                                    {
                                        appState.roleSelector.currentUserRoleId !== Role.Student &&
                                        <Route path="/tags-page">
                                            <TagsPage ></TagsPage>
                                            <Helmet>
                                                <title>Тэги</title>
                                            </Helmet>
                                        </Route>
                                    }
                                    <Route path="/homework">
                                        <HomeworkPage />
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
                            </>
                            :
                            <Switch>
                                <Route exact path="/">
                                    <LoginForm />
                                    <div className="test-page-link"><Link to="/dev-test-page">secret test page</Link></div>
                                </Route>
                                <Route path="/dev-test-page">
                                    <DevTestPage />
                                    <NotificationContainer />
                                </Route>
                            </Switch>
                    }
                    <NotificationContainer />
                </main>
            </div>
            <Loader />
        </div>
    );
}

export default App;
