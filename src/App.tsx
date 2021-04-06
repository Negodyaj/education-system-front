import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomList from './components/custom-list/CustomList';
import Cards from './Cards';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import NavMenu from './components/nav-menu/NavMenu';
import HomeworkPage from './components/homework-page/HomeworkPage';
import NotificationContainer from './shared/components/notification/NotificationContainer'
import UserPage from './components/user-page/UserPage';
import DatePickerComponent from './shared/components/date-picker/DatePickerComponent';
import CustomMultiSelect from './components/multi-select/CustomMultiSelect';
import CoursesPage from './components/courses-page/CoursesPage';
import CourseEdition from './components/courses-page/course-edition/CourseEdition';
import "./shared/fontawesome/FontawesomeIcons"; 
import { themes } from './shared/themes/Themes';
import { Role } from './enums/role';
import NotificationData from './shared/interfaces/NotificationData';
import DevTestPage from './components/dev-test-page/DevTestPage'
import TagsPage from './components/tags-page/TagsPage';


function App() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleId, setRoleId] = useState(0);
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
                                <Route exact path="/">
                                    {
                                        roleId === Role.Test && <DevTestPage sendNotification={sendNewNotification} />
                                    }
                                </Route>
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
                                    <CourseEdition themesList={themes} idCourse={location.pathname} />
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
                            <LoginForm onLoginClick={loginHandler} />
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
