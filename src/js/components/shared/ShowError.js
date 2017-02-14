import React from 'react';

ShowError.propTypes = {
  error: React.PropTypes.string
};

export default function ShowError(props){
  if (!props.error)
    return null;
  return (
    <p className='warning'>{props.error}</p>
  );
}
