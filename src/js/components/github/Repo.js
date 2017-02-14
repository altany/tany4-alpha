import React from 'react';
import { Link } from 'react-router';
import Fetcher from '../shared/Fetcher.js';

function Repo (props) {
  let repo = props.repo;
  return (
    <div className='repoContainer'>
      <h3 className='repoName'>
        <Link to={repo.html_url}>
          {repo.name}
        </Link>
        <div className='lastCommit'>
          <Fetcher url={window.location.origin + '/api/github/last-commit/' + repo.name} />
        </div>
      </h3>
      
    </div>
    
  );
}

export default Repo;
