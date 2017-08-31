import React from 'react';
import PropTypes from 'prop-types';

import { Form, TextArea } from 'semantic-ui-react';

const TextAreaField = ({label, name, value, onChange, index=0}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <Form.Field className="form-field">
      <label htmlFor={id}>{label}</label>
      <TextArea
        autoHeight
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        />
    </Form.Field>
  )
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaField;
