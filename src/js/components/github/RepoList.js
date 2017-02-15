import React from 'react';
import Repo from './Repo';

function RepoList(props) {
  return (  
    <div>
      {props.data.map((repo, i)=>{
        return <Repo key={i} repo={repo} />;   
      })}
    </div>
  );
}

export default RepoList;
