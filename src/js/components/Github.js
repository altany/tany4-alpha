import React from 'react';
import Fetcher from './shared/Fetcher.js';
import RepoList from './github/RepoList.js';

class Github extends React.Component {
  render() {
    return (
      <div>
        <p className='intro'>
          {'Check out my Github profile on '}
          <a href='http://www.github.com/altany'>
            <img src='https://a248.e.akamai.net/assets.github.com/images/icons/emoji/octocat.png' title='altany on Github' />
          </a>
        </p>

        <h2>Github API Playground</h2>

        <p>
          {'This page contains a list of my Github repos. All the data is retrieved through the '}
          <a href='https://developer.github.com/v3/'>
            Github API v3
          </a>
        </p>


        <Fetcher url={window.location.origin + '/api/github/repos'} >
          <RepoList data={[]}/>
        </Fetcher>

      </div>
    );
  }
}

export default Github;
