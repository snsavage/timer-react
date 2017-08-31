import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/sessionActions';

import { Button, Grid, Form, Header } from 'semantic-ui-react';

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
      <Grid
        verticalAlign="middle"
        centered
        style={{
          height: '100%',
          margin: 0,
        }}>
        <Grid.Column width={6}>
          <Header as="h1">Register</Header>
          <Form onChange={(ev) => this.onChange(ev)} >
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name} />
            </Form.Field>
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
              Register
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(Register));
