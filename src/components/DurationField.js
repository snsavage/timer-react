import React, { Component } from 'react';

import TextField from '../components/TextField';
import { convertTime, displayTimeNoUnits } from '../utils/displayTime';

export default class DurationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: [0,0,0,0,0,0],
      timer: displayTimeNoUnits(this.props.value),
    }
  }

  handleOnChange(ev) {
    const update = [...this.state.input];

    if(update.length > 2) { update.splice(-2, 0, ":") };
    if(update.length > 5) { update.splice(-5, 0, ":") };

    const result = update.join("");

    this.setState({ timer: result });

    if(this.props.action) { this.props.action(convertTime(result)) };
  }

  handleKeyDown(ev) {
    const input = [...this.state.input];

    if(ev.key.match(/\d/) && this.state.input[0] === 0) {
      input.shift();
      input.push(ev.key);
    } else if (ev.key === "Backspace") {
      input.pop();
      input.unshift(0);
    }

    this.setState({ input: input });
  }

  render() {
    const { label, placeholder, name } = this.props;

    return (
      <TextField
        label={label}
        placeholder={placeholder}
        name={name}
        value={this.state.timer}
        onKeyDown={(ev) => this.handleKeyDown(ev)}
        onChange={(ev) => this.handleOnChange(ev)}
      />
    );
  }
}
