import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import RoutineForm from './RoutineForm';
import { createRoutine } from '../actions/routineFormActions';
import { clearCurrentRoutine } from '../actions/routineActions';

export class NewRoutineForm extends Component {
  componentWillMount() {
    const { saved, clearCurrentRoutine } = this.props;
    if(saved) { clearCurrentRoutine() };
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

function mapStateToProps(state) {
  return {
    saved: state.currentRoutine.saved,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoutineForm);
