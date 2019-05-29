import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../compenents/home';
import About from '../compenents/about';
import Contact from '../compenents/contact';

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
                <div>
                    <h2>Welcome to React Router Tutorial</h2>
                    <h3>{this.state.childText2}=={this.state.txt2}</h3>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'}className="nav-link"> Home </Link></li>

                            <li><Link to={
                                { pathname: `/contact/${ this.state.pop}`,
                                    search: '?foo=' + this.state.txt2
                                }
                            }className="nav-link">Contact</Link></li>
                            <li><Link to={'/about'} className="nav-link">About</Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path='/' render={(routeProps) => (
                            <Home {...routeProps} foo="bar"/>
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
