import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';

import RoutineFormRoutineDetails from '../components/RoutineFormRoutineDetails';
import RoutineFormGroups from '../components/RoutineFormGroups';

import * as actions from '../actions/routineFormActions';

export class RoutineForm extends Component {
  onFormChange = () => {
    const { saved, actions } = this.props;

    if (saved) {
      actions.markAsNotSaved();
    }
  }

  onFormSubmit = (ev) => {
    const { onSubmit, routine, history } = this.props;
    ev.preventDefault();

    onSubmit(routine, history)
  }

  render() {
    const { actions, error, routine, submitValue, formTitle } = this.props;
    const errors = error.length > 1 ? error : "";

    return (
      <form
        onChange={() => this.onFormChange()}
        onSubmit={(ev) => this.onFormSubmit(ev)}>
        <h1>{formTitle}</h1>
        <div>{errors}</div>
        <RoutineFormRoutineDetails actions={actions} routine={routine} />
        <RoutineFormGroups actions={actions} groups={routine.groups} />
        <div>
          <input
            type="submit"
            value={submitValue}
            disabled={this.props.saved} />
        </div>
      </form>
    );
  }
}

RoutineForm.propTypes = {
  routine: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  routineId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubmit: PropTypes.func.isRequired,
  submitValue: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    routine: state.currentRoutine.routine,
    saved: state.currentRoutine.saved,
    error: state.currentRoutine.error,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(actions, dispatch),
    onSubmit: bindActionCreators(ownProps.onSubmit, dispatch),
  };
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoutineForm)
);
