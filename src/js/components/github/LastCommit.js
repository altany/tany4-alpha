import React from 'react';
import { Link } from 'react-router';
import Fetcher from '../shared/Fetcher.js';

function LastCommitInfo (props) {
  let info=props.info;
  
  if (info.link) {
    return (
      <span>
        Latest commit:
        <a href={info.link}>
          {info.message}
        </a>
      </span>
    );
  }
  else {
    return (
      <div>
        Latest commit: {info.message} 
      </div>
    );
  }
}


function LastCommit (props) {
  return (
    <div className='lastCommit'>
      <LastCommitInfo info={props.data} />
      {props.data.date || ''}
    </div>
  );
}

export default LastCommit;
