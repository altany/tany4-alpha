import React from 'react';
import { Link } from 'react-router';
import Fetcher from '../shared/Fetcher.js';
import LastCommit from './LastCommit.js';

function ReadMe(props) {
  return (
    <div className='readme' dangerouslySetInnerHTML={{ __html: props.data }} />
  );
}

function Repo(props) {
  let repo = props.repo;
  return (
    <div className='repoContainer'>
      <h3 className='repoName'>
        <Link to={repo.html_url}>
          {repo.name}
        </Link>
        <Fetcher url={window.location.origin + '/api/github/last-commit/' + repo.name} >
          <LastCommit data={{}} />
        </Fetcher>
      </h3>
      <Fetcher url={window.location.origin + '/api/github/readme/' + repo.name} >
          <ReadMe data ={{}} />
      </Fetcher>
    </div>
    
  );
}

export default Repo;
