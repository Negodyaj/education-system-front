import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomList from './components/custom-list/CustomList';
import Cards from './Cards';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
    

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <nav>
                    <Link to="/user-cards">User cards</Link>
                    <Link to="/custom-list">Custom list</Link>
                </nav>
            </header>
            <main>
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
            </main>
        </div>
    );
}

export default App;
