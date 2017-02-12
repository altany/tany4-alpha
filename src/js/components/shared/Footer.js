import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='copyright'> Created by
      		<Link to='http://www.linkedin.com/in/taniapapazaf'>
            Tania Papazafeiropoulou
          </Link>
        </div>
      </footer>
    );
  }
}
export default Footer;
