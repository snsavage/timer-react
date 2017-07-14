import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom'

import { fetchRoutines } from './../actions/routineActions';
import RoutinesShow from './RoutinesShow';

class RoutinesIndex extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  render() {
    const routines = this.props.routines.map((e, i) => {
      return (
        <li key={i}>
          <Link to={"/routines/" + e.id.toString()}>{e.name}</Link>
        </li>
      );
    });
    return (
      <div className="routines">
        <h1>Routines</h1>
        { this.props.loading ? (
          <h3>Loading...</h3>
        ) : (
        <ul>
          {routines}
        </ul>
        )}
        <Route path='/routines/:routineId' component={RoutinesShow} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    routines: state.routines.routines,
    loading: state.routines.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchRoutines: bindActionCreators(fetchRoutines, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesIndex);
