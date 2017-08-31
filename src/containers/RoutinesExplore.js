import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RoutinesList from './../containers/RoutinesList.js';
import RoutinesShow from './RoutinesShow';
import { RoutineListItem } from './../components/RoutineListItem';

import { Grid } from 'semantic-ui-react'

export default class RoutinesExplore extends Component {
  render() {
    return (
      <Grid columns={2} padded>
        <Grid.Column width={6}>
          <RoutinesList component={RoutineListItem} />
        </Grid.Column>

        <Grid.Column width={10}>
          <Route path='/routines/:routineId' component={RoutinesShow} />
        </Grid.Column>
      </Grid>
    );
  }
}
