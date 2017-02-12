import React from 'react';
import {Link} from 'react-router';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }
}
export default Counter;
