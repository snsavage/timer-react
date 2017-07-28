import React, { Component } from 'react';
import { displayTime } from './../utils/displayTime';

export class RoutineDetail extends Component {
  render() {
    const { routine } = this.props;

    return (
      <div>
        <h1>{routine.name}</h1>
        <h1>{displayTime(routine.duration)}</h1>
        <p>{routine.description}</p>
        <p>Link: {routine.link}</p>
      </div>
    );
  };
};
