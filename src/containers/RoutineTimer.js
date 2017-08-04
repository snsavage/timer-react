import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { loadCurrentRoutine, clearCurrentRoutine } from './../actions/routineActions';
import RoutinesList from './../containers/RoutinesList';
import { RoutineTimerListItem } from './../components/RoutineTimerListItem';
import { RoutineDetail } from './../components/RoutineDetail';
import { RoutineGroups } from './../components/RoutineGroups';
import { displayTime } from './../utils/displayTime';

export class ComplexTimer extends Component {
  handleClick = (event) => {
    this.props.clearCurrentRoutine();
  }

  render() {
    const { currentRoutine, loadCurrentRoutine, playlist } = this.props;

    const playlistList = playlist.map((e, index) => {
      return (
        <li key={index}>
          {e.groupID} - {e.groupNumber} - {e.name} - {displayTime(e.duration)}
        </li>
      )
    });

    return (
      <div className="complex-timer">
        { currentRoutine.hasOwnProperty("id") ? (
          <div>
            <h1>Complex Timer</h1>
            <button onClick={this.handleClick}>Remove Routine</button>
            <ul>
              {playlistList}
            </ul>
          </div>
        ) : (
          <div>
            <h2>Select Routine</h2>
            <RoutinesList
              component={RoutineTimerListItem}
              loadCurrentRoutine={loadCurrentRoutine} />
          </div>
        )}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentRoutine: state.currentRoutine.routine,
    loading: state.currentRoutine.loading,
    playlist: state.currentRoutine.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentRoutine: bindActionCreators(loadCurrentRoutine, dispatch),
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexTimer);
