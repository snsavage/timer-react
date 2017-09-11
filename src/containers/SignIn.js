import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/sessionActions';

import { Message, Button, Grid, Form, Header } from 'semantic-ui-react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" }
  }

  componentWillUnmount() {
    this.props.actions.clearAuthError();
  }

  onChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value});
  }

  onSubmit = (ev) => {
    const { state } = this.props.location;
    const redirect = state ? state.from.pathname : "/"

    ev.preventDefault();

    this.props.actions.signInUser(this.state, this.props.history, redirect);
  }

  render() {
    const { error } = this.props;

    return (
      <Grid
        verticalAlign="middle"
        centered
        style={{
          height: '100%',
          margin: 0,
        }}>
        <Grid.Column width={6}>
          <Header as="h1">Sign In</Header>

          { error.length > 1 &&
            <Message
              error
              header='Oh no!  Something went wrong!'
              content={error} />
          }

          <Form onChange={(ev) => this.onChange(ev)} >
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.email} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password} />
            </Form.Field>
            <Button
              color="blue"
              type="submit"
              onClick={(ev) => this.onSubmit(ev)}>
              Sign In
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { error: state.session.error };
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignIn)
);
