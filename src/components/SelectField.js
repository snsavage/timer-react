import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectField extends Component {
  render () {
    const { label, name, value, onChange, index } = this.props;
    const id = `${name.split(".").join("_")}_${index}`;

    return (
      <div className="form-field">
        <label htmlFor={id}>{label}</label>
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange} >
          {this.props.children}
        </select>
      </div>
    )
  }
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectField;
