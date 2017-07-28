import React, { Component } from 'react';

import { displayTime } from './../utils/displayTime';

export class Interval extends Component {
  render() {
    const { name, duration } = this.props.interval;

    return (
      <div className="interval">
        <h3>{name}</h3>
        <h3>{displayTime(duration)}</h3>
      </div>
    );
  };
};
