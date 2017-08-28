import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberField from '../components/NumberField';
import Button from '../components/Button';

import RoutineFormIntervals from './RoutineFormIntervals';

export default class RoutineFormGroups extends Component {
  render() {
    const { actions, groups } = this.props;

    const groupFields = groups.map((group, index) => {
      return (
        <div key={index}>
          <NumberField
            label="Times"
            name={`routine.group[${index}]`}
            value={group.times}
            onChange={(ev) =>
              actions.changeGroup(
                group.id, "times", parseInt(ev.target.value, 10))} />
          <Button
            label="Remove Group"
            onClick={actions.removeGroup}
            groupId={group.id} />
          <Button
            label="Move Up"
            onClick={actions.moveGroupUp}
            groupId={group.id} />
          <Button
            label="Move Down"
            onClick={actions.moveGroupDown}
            groupId={group.id} />
          <RoutineFormIntervals
            actions={actions}
            intervals={group.intervals}
            groupIndex={index}
            groupId={group.id} />
        </div>
      );
    });

    return (
      <div>
        {groupFields}
        <Button
          label="Add Group"
          onClick={actions.addGroup} />
      </div>
    );
  }
}

RoutineFormGroups.propTypes = {
  actions: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
}
