import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRoutine } from './../actions/routineActions';
import { RoutineDetail } from './../components/RoutineDetail';
import { RoutineGroups } from './../components/RoutineGroups';
import AuthorizedLink from '../containers/AuthorizedLink';

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

    return (
      <div className="routine">
        { loading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <RoutineDetail routine={routine} />
            <Link to={"/timer/routine/" + routine.id.toString()}>Play</Link>
            <AuthorizedLink
              resource={routine}
              user={user}
              to={`/routines/${routine.id}/edit`}>
              Edit
            </AuthorizedLink>
            <RoutineGroups groups={routine.groups} />
          </div>
        )}
      </div>
    )
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
