import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

const TextField = ({label, name, value, onChange, index=0, type="text"}) => {
  const id = `${name.split(".").join("_")}_${index}`;

  return (
    <Form.Field>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange} />
    </Form.Field>
  )
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextField;
