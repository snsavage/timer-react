import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({label, name, value, onChange, index=0}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        />
    </div>
  )
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaField;
