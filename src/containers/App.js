import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';

import Timer from './Timer';
import RoutinesExplore from './RoutinesExplore';
import RoutineTimer from './RoutineTimer';
import NewRoutineForm from './NewRoutineForm';
import EditRoutineForm from './EditRoutineForm';
import Register from './Register';
import SignIn from './SignIn';
import SignOut from './SignOut';
import PrivateRoute from './PrivateRoute';
import Nav from './Nav';

import * as actions from '../actions/sessionActions';

import { Container } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.actions.loadUserTraits();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Nav loggedIn={this.props.loggedIn} location={this.props.location} />
          <div>
            <Route exact path='/' component={Timer} />
            <Switch>
              <Route path='/timer/routine/:routineId' component={RoutineTimer} />
              <Route path='/timer/routine' component={RoutineTimer} />
            </Switch>
            <Switch>
              <PrivateRoute
                path='/routines/:routineId/edit'
                component={EditRoutineForm} />
              <Route path='/routines/new' component={NewRoutineForm} />
              <Route path='/routines' component={RoutinesExplore} />
            </Switch>
            <Route path='/register' component={Register} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signout' component={SignOut} />
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
