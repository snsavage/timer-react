import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';
import SelectField from '../components/SelectField';

export default class RoutineFormRoutineDetails extends Component {
  render() {
    const { actions, routine } = this.props;

    return (
      <div>
        <TextField
          label="Name"
          name="routine.name"
          value={routine.name}
          onChange={(ev) => actions.changeRoutine("name", ev.target.value)} />
        <TextAreaField
          label="Description"
          name="routine.description"
          value={routine.description}
          onChange={(ev) => actions.changeRoutine("description", ev.target.value)} />
        <TextField
          label="Link"
          name="routine.link"
          value={routine.link}
          onChange={(ev) => actions.changeRoutine("link", ev.target.value)} />
        <SelectField
          label="Public"
          name="routine.public"
          value={routine.public}
          onChange={(ev) =>
            actions.changeRoutine("public", (ev.target.value === "true"))} >
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </SelectField>
      </div>
    );
  }
}

RoutineFormRoutineDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  routine: PropTypes.object.isRequired,
}
