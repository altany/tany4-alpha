import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className='logo'>
          <Link to='/'>
            <img src='/images/logo.svg' alt='Tany4 logo' />
          </Link>
        </div>
        <div className='about'>
          <div className='social'>
            <Link className='socialLink' to='/social'>Let's connect</Link>
            <div className='socialLogos'>
              <Link className='icon icon-stackoverflow' to='http://stackoverflow.com/story/tany4' />
              <Link className='icon icon-linkedin2' to='http://www.linkedin.com/in/taniapapazaf' />
              <Link className='icon icon-github' to='/github' />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
