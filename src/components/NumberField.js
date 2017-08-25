import React from 'react';
import PropTypes from 'prop-types';

const NumberField = ({label, name,value, onChange, index=0, type="number"}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        step="1"
        min="0" />
    </div>
  )
};

NumberField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberField;
