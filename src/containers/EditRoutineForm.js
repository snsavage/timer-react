import React, { Component } from 'react';

import RoutineForm from './RoutineForm';
import { updateRoutine } from '../actions/routineFormActions';

export default class EditRoutineForm extends Component {
  render () {
    return (
      <RoutineForm
        onSubmit={updateRoutine}
        formTitle={"Edit Routine"}
        submitValue={"Save Routine"} />
    );
  }
}
