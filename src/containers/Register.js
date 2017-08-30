import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/sessionActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  onChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value});
  }

  onSubmit = (ev) => {
    const { state } = this.props.location;
    const redirect = state ? state.from.pathname : "/"

    ev.preventDefault();

    this.props.actions.signUpUser(this.state, this.props.history, redirect);
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onChange={(ev) => this.onChange(ev)} >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password} />
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              onClick={(ev) => this.onSubmit(ev)} />
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(Register));
