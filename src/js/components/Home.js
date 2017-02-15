import React from 'react';
import { Link } from 'react-router';


class Home extends React.Component {
  render() {
    return (
      <div className='greeting'>
        <div className='profileImg'>
          <img src='/images/profile.svg' alt='Greeting' />
        </div>
        <div className='info'>
          <h1>Tania Papazafeiropoulou</h1>
          <h2>Web Developer</h2>
          <div className='statement'>
            <p>
               Hi, I'm Tania and I love beautiful and practical web sites!
            </p>
            <p>
              I enjoy building captivating UIs that make the experience easy and fun. My favourite technologies right now are Node.js and React. Lately, I have been working with React Native and exploring TDD using tools like Mocha.
            </p>
            <p>
              I currently work as a Full Stack Web Developer, using Node.js, ReactJS, AngularJS, jQuery, Sass and more.
            </p>
          </div>
          <Link to='/social' className='connect'>Let's connect</Link>
        </div>
      </div>
    );
  }
}
export default Home;
