import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/sessionActions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" }
  }

  onChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value});
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.actions.signInUser(this.state, this.props.history);
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onChange={(ev) => this.onChange(ev)} >
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
              value="Sign In"
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

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
