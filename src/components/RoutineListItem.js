import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { displayTime } from './../utils/displayTime';
import { Menu, Label, Icon } from 'semantic-ui-react'

export class RoutineListItem extends Component {
  render() {
    const { routine } = this.props;

    return (
      <Menu.Item
        as={NavLink}
        exact
        activeClassName="active"
        to={`/routines/${routine.id.toString()}`}>
          <Label color='black' basic>
            <Icon name='clock' />{displayTime(routine.duration)}
          </Label>
          {routine.name}
      </Menu.Item>
    );
  };
};
