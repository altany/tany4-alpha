import React from 'react';
import PropTypes from 'prop-types';

ShowError.propTypes = {
  error: PropTypes.string
};

export default function ShowError(props){
  if (!props.error)
    return null;
  return (
    <p className='warning'>{props.error}</p>
  );
}
