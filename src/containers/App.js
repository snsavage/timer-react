import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import Timer from './Timer';
import RoutinesIndex from './RoutinesIndex';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <nav>
            <ul>
              <li><Link to="/">Timer</Link></li>
              <li><Link to="/routines">Routines</Link></li>
            </ul>
          </nav>
          <div>
            <Route exact path='/' component={Timer} />
            <Route path='/routines' component={RoutinesIndex} />
          </div>
      </main>
      </div>
    );
  }
}

export default App;
