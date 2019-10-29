import React from 'react';
import { ScrollToTopRoute } from './ScrollToTopRoute'
import Home from './Components/Home'
import NoMatch from './Components/NoMatch'
import About from './Components/About'
import PokemonList from './Components/PokemonList'
import TestJS from './Components/TestJS'
import OwnUseReducer from './Components/OwnUseReducer'
import MockServerCall from './Components/MockServerCall'
import PromiseALL from './Components/PromiseALL'
import LazyLoad from './Components/LazyLoad'
import SimpleDebounce from './Components/SimpleDebounce'
import { Game } from './Components/Game'

import {
	BrowserRouter as Router,
	Switch,
	// Route,
	Link
 } from "react-router-dom";

 // import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';
import './Components/PokemonList.css';
import './Components/Game.css';

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
              <Link to="/test-js">TestJS</Link>
            </li>
            <li>
              <Link to="/pokemon-list">PokemonList</Link>
            </li>          
            <li>
              <Link to="/mock-server-call">MockServerCall</Link>
            </li>          
            <li>
              <Link to="/promise-all">PromiseALL</Link>
            </li>          
            <li>
              <Link to="/lazy-load">LazyLoad</Link>
            </li>          
            
            <li>
              <Link to="/simple-debounce">SimpleDebounce</Link>
            </li>  

				<li>
              <Link to="/game">Game</Link>
            </li>  
          </ul>

        </header>

        <Switch>
          <ScrollToTopRoute exact path="/" component={Home} />
          <ScrollToTopRoute exact path="/about" component={About} />
          <ScrollToTopRoute exact path="/test-js" component={TestJS} />
          <ScrollToTopRoute exact path="/pokemon-list" component={PokemonList} />
          <ScrollToTopRoute exact path="/own-use-reducer" component={OwnUseReducer} />
          <ScrollToTopRoute exact path="/mock-server-call" component={MockServerCall} />
          <ScrollToTopRoute exact path="/promise-all" component={PromiseALL} />

          <ScrollToTopRoute exact path="/lazy-load" component={LazyLoad}>
            <img alt="" src="https://media.giphy.com/media/HhvUpQhBWMtwc/200.gif"/>
            <img alt="" src="https://media2.giphy.com/media/3oEduUDvycvu3GYkdG/200w.gif"/>
            <img alt="" src="https://media0.giphy.com/media/142UITjG5GjIRi/200w.gif" />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact path="/simple-debounce" component={SimpleDebounce} />
          <ScrollToTopRoute exact path="/game" component={Game} />
          
          <ScrollToTopRoute exact component={NoMatch} />
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
