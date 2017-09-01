import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import Button from '../components/Button';

import { List, Form } from 'semantic-ui-react';

export default class RoutineFormIntervals extends Component {
  render() {
    const { actions, intervals, groupIndex, groupId } = this.props;

    const intervalFields = intervals.map((interval, index) => {
      return (
        <Form.Group key={index} inline style={{ alignItems: "flex-end" }}>
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
            color="blue"
            icon="chevron up"
            onClick={actions.moveIntervalUp}
            groupId={groupId}
            intervalId={interval.id}
            order={interval.order} />
          <Button
            color="blue"
            icon="chevron down"
            onClick={actions.moveIntervalDown}
            groupId={groupId}
            intervalId={interval.id} />
          <Button
            color="red"
            icon="remove"
            onClick={actions.removeInterval}
            groupId={groupId}
            intervalId={interval.id} />
        </Form.Group>
      );
    });

    return (
      <List.Item>
        <List.Header as="h4">Intervals</List.Header>
        {intervalFields}
        <Button
          float="right"
          size="small"
          color="green"
          label="Add New Interval"
          icon="plus"
          onClick={actions.addInterval}
          groupId={groupId} />
      </List.Item>
    );
  }
}

RoutineFormIntervals.propTypes = {
  actions: PropTypes.object.isRequired,
  intervals: PropTypes.array.isRequired,
  groupIndex: PropTypes.number.isRequired,
  groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
