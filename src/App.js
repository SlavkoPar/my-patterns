import React from 'react';
import { ScrollToTopRoute } from './ScrollToTopRoute'
import Home from './Components/Home'
import Search from './Components/Search'
import NoMatch from './Components/NoMatch'
import About from './Components/About'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
 } from "react-router-dom";

 import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
    	<Router history={History}>
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul className="router-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/search">search</Link>
            </li>
            <li>
              <Link to="/">NoMatch</Link>
            </li>          
          </ul>

        </header>

        <Switch>
          <ScrollToTopRoute exact path="/" component={Home} />
          <ScrollToTopRoute exact path="/about" component={About} />
          <ScrollToTopRoute exact path="/search" component={Search} />
          <ScrollToTopRoute exact component={NoMatch} />
        </Switch>

      </Router>

    </div>
  );
}

export default App;
