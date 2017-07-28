import React, { Component } from 'react';

import { Interval } from './../components/Interval';

export class Group extends Component {
  render() {
    const { group } = this.props;

    const intervals = group.intervals.map((element, index) => {
      return <Interval key={index} interval={element} />
    });

    return (
      <div>
        <div className="group-times">
          <h3>{`${group.times}x`}</h3>
        </div>
        { intervals }
      </div>
    );
  };
};
