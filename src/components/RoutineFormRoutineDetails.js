import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';
import SelectField from '../components/SelectField';

import { Form, Segment } from 'semantic-ui-react';

export default class RoutineFormRoutineDetails extends Component {
  render() {
    const { actions, routine } = this.props;

    return (
      <Segment>
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
        <Form.Field>
          <label>Privacy Setting</label>
          <SelectField
            label="Privacy Setting"
            name="routine.public"
            initialValue={routine.public}
            options={[
              { value: "true", text: "Public" },
              { value: "false", text: "Private" }
            ]}
            onChange={(ev) =>
                actions.changeRoutine("public", (ev.target.value === "true"))} />
        </Form.Field>
      </Segment>
    );
  }
}

RoutineFormRoutineDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  routine: PropTypes.object.isRequired,
}
