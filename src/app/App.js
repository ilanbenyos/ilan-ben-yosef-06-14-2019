import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from '../compenents/views/game/game';
import Home from '../compenents/views/home';
import About from '../compenents/views/about';
import Contact from '../compenents/views/contact';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt2: 'txt2',
            pop:'popo',
            txt: 'init',
            childText2: 'rrr',
            childText: 'init',
            user:null,
        };
    }
    handleChildClick = () => {
        this.setState(state => ({ childText: state.childText === 'init'? 'no!!!':'init' }));
    };
    render() {
        return (
            <Router>
                <div className="container">
                  <h2>התרגיל של הגר</h2>

                  <div className="navbar-nav mr-auto d-flex flex-row">
                        <Link to={'/'}className="nav-link mr-2"> Home </Link>
                        <Link to={
                            { pathname: `/contact/${ this.state.pop}`,
                                search: '?foo=' + this.state.txt2
                            }
                        }className="nav-link mr-2">Contact</Link>
                        <Link to={'/game'} className="nav-link mr-2">Game</Link>
                        <Link to={'/about'} className="nav-link">About</Link>
                    </div>
                    <hr />
                    <Switch>
                        <Route exact path='/' render={(routeProps) => (
                            <Home {...routeProps} foo="bar"/>
                        )}/>
                        <Route exact path='/game' render={(routeProps) => (
                            <Game {...routeProps}/>
                        )}/>
                        <Route
                            path="/contact/:txt2"
                            render={(routeProps) => (
                                <Contact {...routeProps}
                                         foo="bar"
                                         onClick={this.handleChildClick}
                                         text={this.state.childText}/>
                            )}
                        />
                        <Route path='/about' component={About} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
