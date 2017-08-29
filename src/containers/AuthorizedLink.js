import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { authorize } from '../utils/session';

export default class AuthorizedLink extends Component {
  render () {
    const { resource, user, to, children, ...rest } = this.props;

    if (authorize(resource, user)) {
      return (
        <Link {...rest} to={to}>
          {this.props.children}
        </Link>
      );
    } else {
      return null;
    }
  }
}

AuthorizedLink.propTypes = {
  resource: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
}
