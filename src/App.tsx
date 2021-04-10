import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import NavMenu from './components/nav-menu/NavMenu';
import HomeworkPage from './components/homework-page/HomeworkPage';
import NotificationContainer from './shared/components/notification/NotificationContainer'
import UserPage from './components/user-page/UserPage';
import CoursesPage from './components/courses-page/CoursesPage';
import CourseEdition from './components/courses-page/course-edition/CourseEdition';
import "./shared/fontawesome/FontawesomeIcons";
import { Role } from './enums/role';
import NotificationData from './shared/interfaces/NotificationData';
import DevTestPage from './components/dev-test-page/DevTestPage';
import TagsPage from './components/tags-page/TagsPage';
import { getToken } from './services/auth.service';
import { getUser } from './services/test-wretch';


function App() {
    const history = useHistory();
    const token = getToken();
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [roleId, setRoleId] = useState(Role.Admin);
    const [dismissibleNotifications, setDismissibleNotifications] = useState<NotificationData[]>([]);
    const [nonDismissibleNotifications, setNonDismissibleNotifications] = useState<NotificationData[]>([]);

    const sendNewNotification = (newNotification: NotificationData) => {
        if (newNotification.isDismissible) {
            setDismissibleNotifications([newNotification, ...dismissibleNotifications]);
        } else {
            setNonDismissibleNotifications([newNotification, ...nonDismissibleNotifications]);
        }
    }
    const deleteNotification = (dismissedNotification: NotificationData) => {
        const newState = dismissibleNotifications.filter(notification => notification != dismissedNotification);
        setDismissibleNotifications(newState);
    }

    const users = [
        { login: 'test', password: 'test', roleId: Role.Test },
        { login: 'student', password: 'qwerty', roleId: Role.Student },
        { login: 'manager', password: 'manager', roleId: Role.Manager },
        { login: 'admin', password: 'admin', roleId: Role.Admin },
        { login: 'methodist', password: 'methodist', roleId: Role.Methodist },
        { login: 'teacher', password: 'teacher', roleId: Role.Teacher }
    ];

    const loginHandler = (email: string, password: string) => {
        const securityEntries = users.filter(item => item.login === email && item.password === password);
        if (securityEntries.length) {
            const entry = securityEntries[0];
            setIsLoggedIn(true);
            setRoleId(entry.roleId);
            console.log(roleId);
        }
    }

    const logOut = () => {
        setIsLoggedIn(false);
        history.push("/");
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="App">
            <header>
                <div className="logo-container">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className="header-user-actions">
                    {
                        isLoggedIn && <button onClick={logOut}>Log out</button>
                    }
                </div>
            </header>
            <div className="main-content">
                <aside>
                    {
                        isLoggedIn ?
                            <NavMenu roleId={roleId} />
                            :
                            <h2>Залогиньтесь!</h2>
                    }
                </aside>
                <main>
                    {
                        isLoggedIn ?
                            <Switch>
                                {
                                    (roleId === Role.Manager || roleId === Role.Admin) &&
                                    <Route path="/user-page">
                                        <UserPage
                                            roleId={roleId}
                                            sendNotification={sendNewNotification}></UserPage>
                                    </Route>
                                }
                                {
                                    roleId === Role.Teacher &&
                                    <Route path="/courses-page">
                                        <CoursesPage roleId={roleId}></CoursesPage>
                                    </Route>
                                }
                                <Route path="/course-edition/:id" render={({ location, history }) => (
                                    <CourseEdition idCourse={location.pathname} />
                                )}>
                                </Route>
                                {
                                    roleId !== Role.Student &&
                                    <Route path="/tags-page">
                                        <TagsPage></TagsPage>
                                    </Route>
                                }
                                <Route path="/homework">
                                    <HomeworkPage roleId={roleId} />
                                </Route>
                            </Switch>
                            :
                            <Switch>
                                <Route exact path="/">
                                    <LoginForm onLoginClick={loginHandler} />
                                    <div className="test-page-link"><Link to="/dev-test-page">secret test page</Link></div>
                                </Route>
                                <Route path="/dev-test-page">
                                    <DevTestPage sendNotification={sendNewNotification} />
                                </Route>
                            </Switch>

                    }
                    {
                        isLoggedIn ? <NotificationContainer
                            dismissibleNotifications={dismissibleNotifications}
                            nonDismissibleNotifications={nonDismissibleNotifications}
                            deleteNotification={deleteNotification} /> : <></>
                    }
                </main>
            </div>
        </div>
    );
}

export default App;
