import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router';

import RoutineFormRoutineDetails from '../components/RoutineFormRoutineDetails';
import RoutineFormGroups from '../components/RoutineFormGroups';

import * as actions from '../actions/routineFormActions';

export class RoutineForm extends Component {
  onFormChange = () => {
    if (this.props.saved) {
      this.props.actions.markAsNotSaved();
    }
  }

  onFormSubmit = (ev) => {
    const { actions, routine, history } = this.props;
    ev.preventDefault();

    actions.createRoutine(routine, history)
  }

  render() {
    const { actions, error, routine } = this.props;

    return (
      <form
        onChange={() => this.onFormChange()}
        onSubmit={(ev) => this.onFormSubmit(ev)}>
        <h1>Routine Form</h1>
        { error.length > 1 &&
          <div>{this.props.error}</div>
        }
        <RoutineFormRoutineDetails actions={actions} routine={routine} />
        <RoutineFormGroups actions={actions} groups={routine.groups} />
        <div>
          { this.props.saved ? (
            <h1>The routine is currently saved!</h1>
          ) : (
            <input type="submit" value="Save" />
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    routine: state.currentRoutine.routine,
    saved: state.currentRoutine.saved,
    error: state.currentRoutine.error,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutineForm));
