import React, { Component } from 'react';
import ScrollToTopRoute from './ScrollToTopRoute'
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

		<Router history={History}>
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
