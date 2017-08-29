import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import RoutineForm from './RoutineForm';
import { updateRoutine } from '../actions/routineFormActions';
import * as actions from '../actions/routineActions';
import { authorize } from '../utils/session';

class EditRoutineForm extends Component {
  componentWillMount() {
    const { routineId } = this.props.match.params;
    const { actions, currentRoutine } = this.props;

    if(routineId) { actions.loadCurrentRoutine(routineId) }
  }

  render () {
    const { routine, loading, user} = this.props;

    if (loading) {
      return (<h3>Loading...</h3>);
    } else if (authorize(routine, user)) {
      return (
        <RoutineForm
          onSubmit={updateRoutine}
          formTitle={"Edit Routine"}
          submitValue={"Save Routine"} />
      );
    } else {
      return (
        <Redirect to={`/routines/${routine.id}`} />
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    routine: state.currentRoutine.routine,
    loading: state.currentRoutine.loading,
    user: state.session.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditRoutineForm)
);
