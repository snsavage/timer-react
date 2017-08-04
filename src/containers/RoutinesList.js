import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { fetchRoutines } from './../actions/routineActions';

class RoutinesList extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  render() {
    const { routines, component, ...passThroughProps } = this.props;

    const routineListElements = routines.map((element, index) => {
      return (
        React.createElement( component, {
          routine: element,
          key: index,
          ...passThroughProps,
        })
      );
    });

    return (
      <div className="routines">
        <h1>Routines</h1>
        { this.props.loading ? (
          <h3>Loading...</h3>
        ) : (
        <ul>
          { routineListElements }
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesList);
