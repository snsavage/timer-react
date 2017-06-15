import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';

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
      console.log(this.state.remainingTime);
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
      <div className="App">
        <h1>Countdown!</h1>
        <Display remainingTime={this.state.remainingTime} />
        <form onSubmit={(ev) => this.handleOnSubmit(ev)}>
          <input type="text"
            onChange={(ev) => this.handleOnChange(ev)}
            onBlur={(ev) => this.handleOnBlur(ev) }
            value={this.state.timer} />
          <input type="submit" value={this.state.buttonName} />
        </form>
      </div>
    );
  }
}

class Display extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.remainingTime}</h1>
      </div>
    )
  }
}
