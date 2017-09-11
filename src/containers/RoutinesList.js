import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { fetchRoutines } from './../actions/routineActions';

import { Header, Menu, Container, Loader } from 'semantic-ui-react'

class RoutinesList extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routines.length === 0 ) {
      this.props.fetchRoutines();
    }
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
        <Header as='h1'>Routines</Header>
        { this.props.loading ? (
          <Container textAlign="center" >
            <Loader active inline>Loading Routines</Loader>
          </Container>
        ) : (
          <Menu fluid vertical tabular>
            { routineListElements }
          </Menu>
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
  connect(mapStateToProps, mapDispatchToProps)(RoutinesList)
);
