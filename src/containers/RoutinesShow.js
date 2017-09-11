import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import * as actions from './../actions/routineActions';
import { Groups } from './../components/Groups';
import AuthorizedLink from '../containers/AuthorizedLink';
import { displayTime } from './../utils/displayTime';
import RoutineDetails from './../components/RoutineDetails';

import {
  Button,
  Loader,
  Segment,
  Header,
  Icon,
  Container
} from 'semantic-ui-react'

class RoutinesShow extends Component {
  componentWillMount() {
    this.props.actions.fetchRoutine(this.props.routineId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.routineId !== this.props.routineId) {
      this.props.actions.fetchRoutine(nextProps.match.params.routineId);
    }
  }

  onDeleteRoutine = (ev) => {
    const { routine, actions, history } = this.props;
    ev.preventDefault();

    actions.deleteRoutine(routine.routine.id, history);
  }

  render() {
    const { routine, loading } = this.props.routine;
    const { user } = this.props;

    if(loading) {
      return (
        <Container textAlign="center" >
          <Loader active inline>Loading Routine</Loader>
        </Container>
      );
    } else {
      return (
        <Container>
          <Segment attached='top' clearing>
            <Header as='h1' floated='left'>{routine.name}</Header>
            <Header as='h4' floated='right'>
              <Icon name='clock' />{displayTime(routine.duration)}
            </Header>
          </Segment>
          <RoutineDetails routine={routine} />
          <Segment attached>
            <Button
              color="green"
              as={Link}
              to={"/timer/routine/" + routine.id.toString()}>
              Play
            </Button>
            <Button
              color="blue"
              as={AuthorizedLink}
              resource={routine}
              user={user}
              to={`/routines/${routine.id}/edit`}>
              Edit
            </Button>
            <Button
              onClick={(ev) => this.onDeleteRoutine(ev)}
              color="red"
              as={AuthorizedLink}
              resource={routine}
              user={user}
              to={`/routines`}>
              Delete
            </Button>
          </Segment>
          <Segment attached="bottom">
            <Groups groups={routine.groups} />
          </Segment>
        </Container>
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    routine: state.routine,
    user: state.session.user,
    routineId: ownProps.match.params.routineId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoutinesShow)
);
