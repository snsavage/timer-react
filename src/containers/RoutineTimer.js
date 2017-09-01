import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loadCurrentRoutine,
  clearCurrentRoutine,
  startCurrentRoutine,
  rewindCurrentRoutine,
  clearCurrentInterval,
} from './../actions/routineActions';

import { displayTime } from './../utils/displayTime';
import { remainingDuration } from './../utils/timer';

import {
  Grid,
  Button,
  Loader,
  Segment,
  Header,
  Container,
  List,
} from 'semantic-ui-react'

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

    if (nextProps.playlist.length === 0 && this.props.playing) {
      this.props.clearCurrentInterval(this.props.timerId);
    }
  }

  handleRestartRoutine = (event) => {
    this.props.loadCurrentRoutine(this.props.routineId);
  }

  handleClearRoutineClick = (event) => {
    this.props.clearCurrentRoutine();
  }

  handleStartRoutineClick = (event) => {
    if (!this.props.playing) {
      this.props.startCurrentRoutine();
    }
  }

  handleStopRoutineClick = (event) => {
    this.props.clearCurrentInterval(this.props.timerId);
  }

  handleRewindRoutineClick = (event) => {
    this.props.clearCurrentInterval(this.props.timerId);
    this.props.rewindCurrentRoutine();
  }

  render() {
    const {
      currentRoutine, playlist, loading, completedPlaylist
    } = this.props;

    const playlistList = playlist.map((e, index) => {
      if (index === 0 && this.props.playing) {
        return (
          <List.Item key={index}>
            <List.Content>
              <Header as='h3' color='red'>
                {displayTime(e.remainingDuration)} {e.name}
              </Header>
            </List.Content>
          </List.Item>
        )
      } else {
        return (
          <List.Item key={index}>
            <List.Content>
              {displayTime(e.remainingDuration)} {e.name}
            </List.Content>
          </List.Item>
        )
      }
    });

    const completedPlaylistList = completedPlaylist.map((e, index) => {
      return (
        <List.Item key={index}>
          <List.Icon name="checkmark" />
          <List.Content>
            <em>{e.name} {displayTime(0)}</em>
          </List.Content>
        </List.Item>
      )
    }).reverse();

    if(this.props.routineId) {
      if(loading) {
        return(
          <Grid columns={1} padded centered>
            <Grid.Column width={4}>
              <Container textAlign="center" >
                <Loader active inline>Loading Routine</Loader>
              </Container>
            </Grid.Column>
          </Grid>
        );
      } else {
        return (
          <Grid columns={2} padded>
            <Grid.Column width={8}>
              <Header as='h1'>Play {currentRoutine.name}</Header>
              <Segment textAlign='center' padded>
                <Header as='h1'>
                  {displayTime(remainingDuration(playlist))}
                </Header>
                { playlist.length > 0 &&
                  <Header as='h2'>
                    {displayTime(playlist[0].remainingDuration)}
                    {" "}
                    {playlist[0].name}
                  </Header>
                }
                <div>
                  { playlist.length > 0 ? (
                    <Button
                      icon="play"
                      color='green'
                      onClick={this.handleStartRoutineClick}
                      disabled={this.props.playing}
                      content="Start" />
                  ) : (
                    <Button
                      icon="refresh"
                      color='blue'
                      onClick={this.handleRestartRoutine}
                      content="Restart" />
                  )}
                  <Button
                    icon='stop'
                    color='red'
                    onClick={this.handleStopRoutineClick}
                    content="Stop" />
                  <Button
                    color='blue'
                    icon='backward'
                    onClick={this.handleRewindRoutineClick}
                    content="Rewind" />
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3'>Playlist</Header>
              <List divided relaxed size='large'>
                {completedPlaylistList}
                {playlistList}
              </List>
            </Grid.Column>
          </Grid>
        );
      }
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
    completedPlaylist: state.currentRoutine.completedPlaylist,
    playing: state.currentRoutine.playing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentRoutine: bindActionCreators(clearCurrentRoutine, dispatch),
    startCurrentRoutine: bindActionCreators(startCurrentRoutine, dispatch),
    rewindCurrentRoutine: bindActionCreators(rewindCurrentRoutine, dispatch),
    loadCurrentRoutine: bindActionCreators(loadCurrentRoutine, dispatch),
    clearCurrentInterval: bindActionCreators(clearCurrentInterval, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexTimer);
