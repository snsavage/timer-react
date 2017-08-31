import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRoutine } from './../actions/routineActions';
import { Groups } from './../components/Groups';
import AuthorizedLink from '../containers/AuthorizedLink';
import { displayTime } from './../utils/displayTime';

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
    this.props.fetchRoutine(this.props.routineId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.routineId !== this.props.routineId) {
      this.props.fetchRoutine(nextProps.match.params.routineId);
    }
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
          <Segment attached>
            <p>{routine.description}</p>
            <p>
              <a
                href={routine.link}
                target="_blank"
                rel="noopener noreferrer">
                More Information <Icon name='external' />
              </a>
            </p>
          </Segment>
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
  return { fetchRoutine: bindActionCreators(fetchRoutine, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesShow);
