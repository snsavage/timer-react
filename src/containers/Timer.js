import React, { Component } from 'react';
import Tone from 'tone';

import './App.css';
import { displayTime } from '../utils/displayTime';

import { Segment, Button, Grid, Form, Header } from 'semantic-ui-react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: '',
      remainingTime: 0,
      intervalId: null,
      countdownRunning: false,
      buttonName: "Start",
    }

    this.synth = new Tone.Synth().toMaster();
    this.updateTimer = this.updateTimer.bind(this);
    this.beep = this.beep.bind(this);
  }

  handleOnChange(ev) {
    this.setState({
      timer: ev.target.value
    });
  }

  handleOnBlur(ev) {
    this.setState({
      remainingTime: parseInt(this.state.timer, 10),
    });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    if (!this.state.countdownRunning) {
      const intervalId = setInterval(this.updateTimer, 1000);
      this.setState({
        intervalId: intervalId,
        buttonName: "Stop",
        countdownRunning: true,
      });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({
        buttonName: "Start",
        countdownRunning: false,
      });
    }
  }

  updateTimer() {
    if (this.state.remainingTime > 0) {
      this.setState({
        remainingTime: this.state.remainingTime - 1,
      });
      // console.log(this.state.remainingTime);
      if(this.state.remainingTime <= 3 && this.state.remainingTime > 0) {
        this.beep("C4", "8n");
      } else if (this.state.remainingTime === 0 ){
        this.beep("C5", "4n");
      }
    } else {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null,
        remainingTime: parseInt(this.state.timer, 10),
        buttonName: "Start",
        countdownRunning: false,
      });
    }
  }

  beep(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }

  render() {
    return (
      <Grid
        verticalAlign="middle"
        centered
        style={{
          height: '100%',
          margin: 0,
        }}>
        <Grid.Column width={6} textAlign="center">
          <Segment padded>
            <Header as="h1">React Timer</Header>
            <Display remainingTime={this.state.remainingTime} />
            <Form onSubmit={(ev) => this.handleOnSubmit(ev)}>
              <Form.Field>
                <input
                  placeholder="Time in Seconds"
                  type="text"
                  onChange={(ev) => this.handleOnChange(ev)}
                  onBlur={(ev) => this.handleOnBlur(ev) }
                  value={this.state.timer} />
              </Form.Field>
              <Button
                color="blue"
                type="submit">
                {this.state.buttonName}
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

class Display extends Component {
  render() {
    return (
      <Segment>
        <Header as='h1'>{displayTime(this.props.remainingTime)}</Header>
      </Segment>
    )
  }
}
