import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import Button from '../components/Button';

export default class RoutineFormIntervals extends Component {
  render() {
    const { actions, intervals, groupIndex, groupId } = this.props;

    const intervalFields = intervals.map((interval, index) => {
      return (
        <div key={index}>
          <TextField
            label="Name"
            name={`routine.group[${groupIndex}].interval[${index}].name`}
            value={interval.name}
            onChange={(ev) =>
              actions.changeInterval(
                groupId, interval.id, "name", ev.target.value)} />
          <NumberField
            label="Duration"
            name={`routine.group[${groupIndex}].interval[${index}].duration`}
            value={interval.duration}
            onChange={(ev) =>
              actions.changeInterval(
                groupId,
                interval.id,
                "duration",
                parseInt(ev.target.value, 10)
              )} />
          <Button
            label="Remove Interval"
            onClick={actions.removeInterval}
            groupId={groupId}
            intervalId={interval.id} />
          <Button
            label="Move Up"
            onClick={actions.moveIntervalUp}
            groupId={groupId}
            intervalId={interval.id}
            order={interval.order} />
          <Button
            label="Move Down"
            onClick={actions.moveIntervalDown}
            groupId={groupId}
            intervalId={interval.id} />
        </div>
      );
    });

    return (
      <div>
        {intervalFields}
        <Button
          label="Add Interval"
          onClick={actions.addInterval}
          groupId={groupId} />
      </div>
    );
  }
}

RoutineFormIntervals.propTypes = {
  actions: PropTypes.object.isRequired,
  intervals: PropTypes.array.isRequired,
  groupIndex: PropTypes.number.isRequired,
  groupId: PropTypes.string.isRequired,
}
