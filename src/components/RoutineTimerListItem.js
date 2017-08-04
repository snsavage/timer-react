import React, { Component } from 'react';
import { displayTime } from './../utils/displayTime';

export class RoutineTimerListItem extends Component {
  handleClick = (event) => {
    const { routine, loadCurrentRoutine } = this.props;
    loadCurrentRoutine(routine.id);
  }

  render() {
    const { routine } = this.props;

    return (
      <li>
        <p>{routine.name}</p>
        <p>{displayTime(routine.duration)}</p>
        <p><button onClick={this.handleClick}>Play</button></p>
      </li>
    );
  };
};
