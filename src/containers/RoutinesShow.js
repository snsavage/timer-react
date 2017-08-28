import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRoutine } from './../actions/routineActions';
import { RoutineDetail } from './../components/RoutineDetail';
import { RoutineGroups } from './../components/RoutineGroups';

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

    return (
      <div className="routine">
        { loading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <RoutineDetail routine={routine} />
            <Link to={"/timer/routine/" + routine.id.toString()}>Play</Link>
            <Link to={"/routines/" + routine.id.toString() + "/edit"}>
              Edit
            </Link>
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
    routineId: ownProps.match.params.routineId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchRoutine: bindActionCreators(fetchRoutine, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesShow);
