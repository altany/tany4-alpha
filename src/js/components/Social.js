import React from 'react';
import { Link } from 'react-router-dom';

class Social extends React.Component {
  render() {
    return (
      <div id='social'>
        <div className='links'>

          <div className='link'>
            <a className='icon icon-profile' href='/TaniaPapazafeiropoulou-CV'>
              <label>CV</label>
            </a>
          </div>

          <div className='link'>
            <a className='icon icon-linkedin2' href='http://www.linkedin.com/in/taniapapazaf' title='LinkedIn'>
              <label>LinkedIn</label>
            </a>
          </div>


          <div className='link'>
            <Link className='icon icon-github' to='/github' title='Github'>
              <label>
                Github
                <span className='rainbow'> Playground</span>
              </label>
            </Link>
          </div>

          <div className='link'>
            <a className='icon icon-stackoverflow' href='http://stackoverflow.com/story/tany4' title='Stackoverflow Story'>
              <label>StackOverflow</label>
            </a>
          </div>

          <div className='link'>
            <a className='icon icon-envelop' href='mailto:hello@tany4.com?Subject=Tany4: Hi!' target='_top'>
              <label>hello@tany4.com</label>
            </a>
          </div>

        </div>
      </div>
    );
  }
}
export default Social;
