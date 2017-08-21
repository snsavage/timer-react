import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({label, name, defaultValue, onBlur, index=0, type="text"}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onBlur={onBlur} />
    </div>
  )
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default TextField;
