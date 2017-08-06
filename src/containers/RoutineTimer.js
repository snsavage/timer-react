import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  loadCurrentRoutine, clearCurrentRoutine, startCurrentRoutine
} from './../actions/routineActions';

import RoutinesList from './../containers/RoutinesList';
import { RoutineTimerListItem } from './../components/RoutineTimerListItem';
import { RoutineDetail } from './../components/RoutineDetail';
import { RoutineGroups } from './../components/RoutineGroups';
import { displayTime } from './../utils/displayTime';
import { remainingDuration } from './../utils/timer';

export class ComplexTimer extends Component {
  componentWillMount() {
    if(this.props.routineId) {
      this.props.loadCurrentRoutine(this.props.routineId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { routineId } = this.props.routineId;
    const { nextRoutineId } = nextProps.match.params;

    if (routineId && nextRoutineId !== routineId) {
      this.props.loadCurrentRoutine(nextProps.match.params.routineId);
    }
  }

  handleClearRoutineClick = (event) => {
    this.props.clearCurrentRoutine();
  }

  handleStartRoutineClick = (event) => {
    // When start is clicked...
    // Create a new interval with setInterval...
    // Store this intervalId in store...
    // Callback should be action/reducer to updateTimer
    this.props.startCurrentRoutine();
  }

  handleStopRoutineClick = (event) => {
    clearInterval(this.props.timerId);
  }

  render() {
    const { currentRoutine, loadCurrentRoutine, playlist, loading } = this.props;

    const playlistList = playlist.map((e, index) => {
      return (
        <li key={index}>
          {e.groupID} - {e.groupNumber} - {e.name} - {displayTime(e.duration)}
        </li>
      )
    });

    if(this.props.routineId) {
      return (
        <div className="complex-timer">
          { loading ? (
            <h3>Loading...</h3>
          ) : (
            <div>
              <h1>Complex Timer</h1>
              <Link
                to="/timer/routine"
                onClick={this.handleClearRoutineClick}>Remove Routine</Link>
              <button onClick={this.handleStartRoutineClick}>Start</button>
              <button onClick={this.handleStopRoutineClick}>Stop</button>
              <h2>Total Time: {displayTime(currentRoutine.duration)}</h2>
              <h2>Remaining Time: {displayTime(remainingDuration(playlist))}</h2>
              <ul>
                {playlistList}
              </ul>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Redirect to='/routines' />
      );
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoutine: state.currentRoutine.routine,
    loading: state.currentRoutine.loading,
    playlist: state.currentRoutine.playlist,
    routineId: ownProps.match.params.routineId,
    timerId: state.currentRoutine.timerId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentRoutine: bindActionCreators(loadCurrentRoutine, dispatch),
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
    startCurrentRoutine: bindActionCreators(startCurrentRoutine, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexTimer);
