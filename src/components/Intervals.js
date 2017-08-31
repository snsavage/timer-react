import React, { Component } from 'react';

import { displayTime } from './../utils/displayTime';

import { List } from 'semantic-ui-react';

export class Intervals extends Component {
  render() {
    const intervals = this.props.intervals.map((interval, index) => {
      return (
        <List.Item key={index}>
          <List.Icon name="clock" />
          <List.Content>
            {displayTime(interval.duration)}
            {" "}
            {interval.name}
          </List.Content>
        </List.Item>
      );
    });

    return (
      <List.List>
        {intervals}
      </List.List>
    )
  };
};
