import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import RoutineForm from './RoutineForm';
import { createRoutine } from '../actions/routineFormActions';
import { clearCurrentRoutine } from '../actions/routineActions';

export class NewRoutineForm extends Component {
  componentWillMount() {
    this.props.clearCurrentRoutine();
  }

  render () {
    return (
      <RoutineForm
        onSubmit={createRoutine}
        formTitle={"New Routine"}
        submitValue={"Create Routine"} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(NewRoutineForm);
