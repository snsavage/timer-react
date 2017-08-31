import React from 'react';
import PropTypes from 'prop-types';

import { Button as UIButton } from 'semantic-ui-react';

const Button = ({label, float, size, color, icon, onClick, ...args}) => {
  function onButtonClick(ev) {
    ev.preventDefault();
    onClick({...args});
  };

  return (
    <UIButton
      className="submit"
      floated={float}
      color={color}
      size={size}
      icon={icon}
      content={label}
      onClick={(ev) => onButtonClick(ev)} />
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button;
