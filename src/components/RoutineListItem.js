import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { secondsToMinutes } from './../formatters';

export class RoutineListItem extends Component {
  render() {
    const { routine } = this.props;
    return (
      <li>
        <Link to={"/routines/" + routine.id.toString()}>{routine.name}</Link>
        {` - ${secondsToMinutes(routine.duration)}`}
      </li>
    );
  };
};
