import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

const NumberField = ({
  label,
  width,
  name,
  value,
  onChange,
  index=0,
  type="number"
}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <Form.Field className="form-field" width={width}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        step="1"
        min="0" />
    </Form.Field>
  )
};

NumberField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberField;
