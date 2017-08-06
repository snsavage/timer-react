import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import Timer from './Timer';
import RoutinesExplore from './RoutinesExplore';
import RoutineTimer from './RoutineTimer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <nav>
            <ul>
              <li><Link to="/">Basic Timer</Link></li>
              <li><Link to="/timer/routine">Routine Timer</Link></li>
              <li><Link to="/routines">Routines</Link></li>
            </ul>
          </nav>
          <div>
            <Route exact path='/' component={Timer} />
            <Switch>
              <Route path='/timer/routine/:routineId' component={RoutineTimer} />
              <Route path='/timer/routine' component={RoutineTimer} />
            </Switch>
            <Route path='/routines' component={RoutinesExplore} />
          </div>
      </main>
      </div>
    );
  }
}

export default App;
