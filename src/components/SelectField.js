import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

class SelectField extends Component {
  render () {
    const { label, name, onChange, index, options, initialValue } = this.props;
    const id = `${name.split(".").join("_")}_${index}`;

    return (
      <Dropdown
        fluid
        selection
        className='form-field'
        defaultValue={initialValue.toString()}
        placeholder={label}
        options={options}
        name={name}
        id={id}
        onChange={onChange} />
    )
  }
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectField;
