import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RoutinesList from './../containers/RoutinesList.js';
import RoutinesShow from './RoutinesShow';

export default class RoutinesExplore extends Component {
  render() {
    return (
      <div className="routines">
        <h1>Routines</h1>

        <RoutinesList />
        <Route path='/routines/:routineId' component={RoutinesShow} />
      </div>
    );
  }
}
