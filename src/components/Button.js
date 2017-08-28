import React from 'react';
import PropTypes from 'prop-types';

const Button = ({label, onClick, ...args}) => {
  function onButtonClick(ev) {
    ev.preventDefault();
    onClick({...args});
  };

  return (
    <button onClick={(ev) => onButtonClick(ev)}>
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button;
