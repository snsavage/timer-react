import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RoutinesList from './../containers/RoutinesList.js';
import RoutinesShow from './RoutinesShow';
import { RoutineListItem } from './../components/RoutineListItem';

export default class RoutinesExplore extends Component {
  render() {
    return (
      <div className="routines">
        <h1>Routines</h1>

        <RoutinesList component={RoutineListItem} />
        <Route path='/routines/:routineId' component={RoutinesShow} />
      </div>
    );
  }
}
