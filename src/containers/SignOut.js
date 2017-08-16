import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/sessionActions';

class SignOut extends Component {
  componentWillMount() {
    this.props.actions.signOutUser();
  }

  render() {
    return (
      <Redirect to='/' />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(SignOut));
