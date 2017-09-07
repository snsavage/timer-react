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

import { Icon, Segment, Container, List } from 'semantic-ui-react'
import './App.css';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-106072204-1');
function Analytics(props){
  if (process.env.NODE_ENV === "production" ) {
    ReactGA.set({ page: props.location.pathname + props.location.search });
    ReactGA.pageview(props.location.pathname + props.location.search);
  }

  return null;
}

class App extends Component {
  componentWillMount() {
    this.props.actions.loadUserTraits();
  }

  render() {
    return (
      <div>
        <Container className="App">
          <Nav
            loggedIn={this.props.loggedIn}
            location={this.props.location} />
          <Route path="/" component={Analytics}/>
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
        </Container>
        <Segment
          style={{ margin: '1em 0em 0em', padding: '5em 0em' }}
          vertical >
          <Container textAlign='center'>
            <List horizontal divided link>
              <List.Item>Made in PA, U.S.A.</List.Item>
              <List.Item><Icon name="copyright"/> 2017 Scott Savage</List.Item>
              <List.Item>
                <a
                  href="https://www.snsavage.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  snsavage.com<Icon name='external' />
                </a>
              </List.Item>
            </List>
          </Container>
        </Segment>
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
