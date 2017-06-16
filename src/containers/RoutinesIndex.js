import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { fetchRoutines } from './../redux/actions/routineActions';

class RoutinesIndex extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  render() {
    const routines = this.props.routines.map((e, i) => {
      return <li key={i}>{e.name}</li>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoutinesIndex)
);
