import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { secondsToMinutes } from './../formatters';

export class RoutineListItem extends Component {
  render() {
    const { routine, index } = this.props;
    return (
      <li key={index}>
        <Link to={"/routines/" + routine.id.toString()}>{routine.name}</Link>
        {` - ${secondsToMinutes(routine.duration)}`}
      </li>
    );
  };
};
