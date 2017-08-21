import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({label, name, defaultValue, onBlur, index=0}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        name={name}
        id={id}
        defaultValue={defaultValue}
        onBlur={onBlur}
        />
    </div>
  )
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default TextAreaField;
