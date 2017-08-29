import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { loggedIn, component, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => (
        loggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location },
          }} />
        )
      )} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.session,
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);
