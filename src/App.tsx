import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomList from './components/custom-list/CustomList';
import Cards from './Cards';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import NavMenu from './components/nav-menu/NavMenu';
import HomeworkPage from './components/homework-page/HomeworkPage';
import CoursesList from './components/courses-list/CoursesList';
import GroupList from './components/group-list/GroupList';
import NewsList from './components/news-list/NewsList';
import HomeworkList from './components/homework-list/HomeworkList';
import NotificationContainer from './shared/notification/NotificationContainer'
import UserPage from './components/user-page/UserPage';
import Calendar from './components/date-picker/DatePicker';

function App() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleId, setRoleId] = useState(0);


    const users = [
        { login: 'test', password: 'test', roleId: 1 },
        { login: 'student', password: 'qwerty', roleId: 2 },
        { login: 'manager', password: '11111', roleId: 3 },
        { login: 'metodist', password: 'metodist', roleId: 4 },
        { login: 'teacher', password: 'teacher', roleId: 5 }
    ];

    const loginHandler = (email: string, password: string) => {
        const securityEntries = users.filter(item => item.login === email && item.password === password);
        if (securityEntries.length) {
            const entry = securityEntries[0];
            setIsLoggedIn(true);
            setRoleId(entry.roleId);
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
                                        roleId===2 && <NewsList />
                                    }
                                </Route>
                                <Route path="/user-cards">
                                    <Cards />
                                </Route>
                                <Route path="/custom-list">
                                    <CustomList />
                                </Route>
                                <Route path="/groups-list">
                                    <GroupList />
                                </Route>
                                <Route path="/courses-list">
                                    <CoursesList />
                                </Route>
                                <Route path="/homework-list">
                                    <HomeworkList />
                                </Route>
                                <Route path="/homework">
                                    <HomeworkPage roleId={roleId} />
                                </Route>
                            </Switch>
                            :
                            <LoginForm onLoginClick={loginHandler} />
                    }
                    {
                        isLoggedIn ? roleId === 2 && <NotificationContainer/> : <></>
                    }
                </main>
            </div>
        </div>
    );
}

export default App;
