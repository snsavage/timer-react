import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { fetchRoutine } from './../redux/actions/routineActions';

class RoutinesShow extends Component {
  componentWillMount() {
    this.props.fetchRoutine(this.props.routineId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.routineId !== this.props.routineId) {
      this.props.fetchRoutine(nextProps.match.params.routineId);
    }
  }

  render() {
    const { name, description, user_id } = this.props.routine.routine;
    const loading = this.props.routine.loading;

    return (
      <div className="routine">
        { loading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p><em>{user_id}</em></p>
          </div>
        )}
      </div>
    )
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    routine: state.routine,
    routineId: ownProps.match.params.routineId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchRoutine: bindActionCreators(fetchRoutine, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesShow);
