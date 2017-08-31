import React, { Component } from 'react';

import { Intervals } from './../components/Intervals'

import { List } from 'semantic-ui-react';

export class Groups extends Component {
  render() {
    const groups = this.props.groups.map((group, index) => {
      return (
        <List.Item key={index}>
          <List.Header>
            {group.times}x
          </List.Header>
          <Intervals intervals={group.intervals} floated='right' />
        </List.Item>
      );
    });

    return (
      <List relaxed divided verticalAlign='middle' size='large'>
        { groups }
      </List>
    );
  };
};
