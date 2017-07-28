import React, { Component } from 'react';

import { Group } from './../components/Group.js'

export class RoutineGroups extends Component {
  render() {
    const groups = this.props.groups.map((element, index) => {
      return <Group key={index} group={element} />
    });

    return (
      <div>
        { groups }
      </div>
    );
  };
};
