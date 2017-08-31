import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberField from '../components/NumberField';
import Button from '../components/Button';

import RoutineFormIntervals from './RoutineFormIntervals';

import { Form, Segment, List } from 'semantic-ui-react';

export default class RoutineFormGroups extends Component {
  render() {
    const { actions, groups } = this.props;

    const groupFields = groups.map((group, index) => {
      return (
        <Segment key={index}>
          <List>
          <List.Item>
            <List.Content>
              <List.Header as='h3'>Group {index + 1}</List.Header>
              <p>Add Groups to Repeat Sets of Intervals</p>
              <Form.Group key={index} inline style={{ alignItems: "flex-end" }}>
                <NumberField
                  label="Repeat Group"
                  name={`routine.group[${index}]`}
                  value={group.times}
                  onChange={(ev) =>
                    actions.changeGroup(
                      group.id, "times", parseInt(ev.target.value, 10))} />
                <Button
                  color="blue"
                  icon="chevron up"
                  onClick={actions.moveGroupUp}
                  groupId={group.id} />
                <Button
                  color="blue"
                  icon="chevron down"
                  onClick={actions.moveGroupDown}
                  groupId={group.id} />
                <Button
                  color="red"
                  icon="remove"
                  onClick={actions.removeGroup}
                  groupId={group.id} />
              </Form.Group>
            </List.Content>
          <RoutineFormIntervals
            actions={actions}
            intervals={group.intervals}
            groupIndex={index}
            groupId={group.id} />
        </List.Item>
        </List>
        </Segment>
      );
    });

    return (
      <div>
        {groupFields}
        <Button
          float="right"
          size="small"
          color="green"
          label="Add New Group"
          icon="plus"
          onClick={actions.addGroup} />
      </div>
    );
  }
}

RoutineFormGroups.propTypes = {
  actions: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
}
