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
              I enjoy building captivating UIs that make the experience easy and fun. My favourite technologies right now are Angular 2, Reactand Node.js. Lately, I have been working with Redux, Ionic 2 and React Native and have been exploring TDD using tools like Mocha.
            </p>
            <p>
              I currently work as a contractor Front End Developer using React, Angular2, Sass, Ionic 2 and more.
            </p>
          </div>
          <Link to='/social' className='connect'>Find more about me</Link>
        </div>
      </div>
    );
  }
}
export default Home;
