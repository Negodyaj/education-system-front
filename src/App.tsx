import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomList from './components/custom-list/CustomList';
import Cards from './Cards';
import { Link, Switch, Route } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';

function App() {
    const isLoggedIn: boolean = true;

    return (
        <div className="App">
            <header>
                <div className="logo-container">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className="header-user-actions">
                    {
                        isLoggedIn && <button>Log out</button>
                    }
                </div>
            </header>
            <div className="main-content">
                <aside>
                    {
                        isLoggedIn ?
                            <nav>
                                <Link to="/user-cards">User cards</Link>
                                <Link to="/custom-list">Custom list</Link>
                            </nav>
                            :
                            <h2>Залогиньтесь!</h2>
                    }
                </aside>
                <main>
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
                        </Switch>
                        :
                        <LoginForm />
                    }
                </main>
            </div>
        </div>
    );
}

export default App;
