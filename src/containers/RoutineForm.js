import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import RoutineFormRoutineDetails from '../components/RoutineFormRoutineDetails';
import RoutineFormGroups from '../components/RoutineFormGroups';

import * as actions from '../actions/routineFormActions';

import { Message, Button, Grid, Form, Header } from 'semantic-ui-react';

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
    const {
      actions,
      error,
      routine,
      submitValue,
      formTitle,
      loggedIn,
    } = this.props;

    return (
      <Form
        onChange={() => this.onFormChange()}
        onSubmit={(ev) => this.onFormSubmit(ev)}>

        <Grid columns={2} centered style={{ margin: 0 }}>
          <Grid.Column width={8}>
            <Header as='h1'>{formTitle}</Header>

            { error.length > 1 &&
              <Message
                error
                header='Oh no!  Something went wrong!'
                content={error} />
            }

            <RoutineFormRoutineDetails actions={actions} routine={routine} />

            { loggedIn ? (
              <Button
                color="blue"
                type="submit"
                disabled={this.props.saved} >
                {submitValue}
              </Button>
            ) : (
              <p>
                <Link to={{
                  pathname: "/register",
                  state: {from: this.props.location},
                }}>
                  Register
                </Link>
                {" or "}
                <Link to={{
                  pathname: "/signin",
                  state: {from: this.props.location},
                }}>
                  Sign In
                </Link>
                {" "}
                to save routine.
              </p>
            )}
          </Grid.Column>

          <Grid.Column width={8}>
            <Header as='h3'>Routine Actions</Header>

            <p>Intervals represent the actions to perform.  For example, run,
              sprint, jump, rest, etc.  Intervals are contained in groups that
              can be repeated.</p>

            <RoutineFormGroups actions={actions} groups={routine.groups} />
          </Grid.Column>
        </Grid>
      </Form>
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
  loggedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    routine: state.currentRoutine.routine,
    saved: state.currentRoutine.saved,
    error: state.currentRoutine.error,
    loggedIn: state.session.session,
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
