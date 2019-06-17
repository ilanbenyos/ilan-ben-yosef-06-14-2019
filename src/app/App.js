import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '../compenents/views/home';
import About from '../compenents/views/about';
import Favorites from '../compenents/views/favorites';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <Router>
                <div className="container">
                  <h2>Herolo Test</h2>
                  <div className="navbar-nav mr-auto d-flex flex-row">
                        <Link to={'/'} className="nav-link mr-2">Home</Link>

                        <Link to={
                            { pathname: `/favorites`}
                        } className="nav-link mr-2">Favorites</Link>

                        <Link to={'/about'} className="nav-link">About</Link>
                    </div>
                    <hr />
                    <Switch>
                        <Route exact path='/' render={(routeProps) => (
                            <Home {...routeProps}/>
                        )}/>
                        <Route
                          path={`/favorites/`} component={Favorites} />
                        <Route path={`/about`} component={About} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
