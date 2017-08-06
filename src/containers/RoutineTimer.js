import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { loadCurrentRoutine, clearCurrentRoutine } from './../actions/routineActions';
import RoutinesList from './../containers/RoutinesList';
import { RoutineTimerListItem } from './../components/RoutineTimerListItem';
import { RoutineDetail } from './../components/RoutineDetail';
import { RoutineGroups } from './../components/RoutineGroups';
import { displayTime } from './../utils/displayTime';

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

  handleClick = (event) => {
    this.props.clearCurrentRoutine();
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
              <Link to="/timer/routine" onClick={this.handleClick}>Remove Routine</Link>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentRoutine: bindActionCreators(loadCurrentRoutine, dispatch),
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexTimer);
