import React from 'react';
import { Link } from 'react-router';

class Social extends React.Component {
  render() {
    return (
      <div>
        <h1>Let's connect</h1>
        <div className='links'>

          <div className='link'>
            <Link className='icon icon-profile' to='/TaniaPapazafeiropoulou-CV'>
              <label>My CV</label>
            </Link>
          </div>

          <div className='link'>
            <Link className='icon icon-linkedin2' to='http://www.linkedin.com/in/taniapapazaf' title='LinkedIn'>
              <label>LinkedIn</label>
            </Link>
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
            <Link className='icon icon-stackoverflow' to='http://stackoverflow.com/story/tany4' title='Stackoverflow Story'>
              <label>StackOverflow</label>
            </Link>
          </div>

          <div className='link'>
            <Link className='icon icon-envelop' to='mailto:hello@tany4.com?Subject=Tany4: Hi!' target='_top'>
              <label>hello@tany4.com</label>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
export default Social;
