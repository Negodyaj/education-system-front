import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomList from './components/custom-list/CustomList';
import Cards from './Cards';
import { Link, Switch, Route } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import NavMenu from './components/nav-menu/NavMenu';
import HomeworkPage from './components/homework-page/homework-page';

function App() {
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
    }

    return (
        <div className="App">
            <header>
                <div className="logo-container">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className="header-user-actions">
                    {
                        isLoggedIn && <Link to="/"><button onClick={logOut}>Log out</button></Link>
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
                    {isLoggedIn && <div>Your role is {roleId}</div>}
                    {
                        isLoggedIn ?
                            <Switch>
                                <Route exact path="/">
                                    <h1>Choose your destiny</h1>
                                </Route>
                                <Route path="/user-cards">
                                    <Cards />
                                </Route>
                                <Route path="/custom-list">
                                    <CustomList />
                                </Route>
                                <Route path="/homework">
                                    <HomeworkPage roleId={roleId} />
                                </Route>
                            </Switch>
                            :
                            <LoginForm onLoginClick={loginHandler} />
                    }
                </main>
            </div>
        </div>
    );
}

export default App;
