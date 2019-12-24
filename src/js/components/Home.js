import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render () {
    return (
      <div id='home'>
        <div className='greeting'>
          <div className='profileImg'>
            <img src='/images/profile.svg' alt='Greeting' />
          </div>
          <div className='info'>
            <h1>Tania Papazafeiropoulou</h1>
            <h2>Web Developer</h2>
            <div className='statement'>
              <p>{`Hi, I'm Tania and I love beautiful and engaging web apps!`}</p>
              <p>
                I enjoy building captivating UIs that make user experience easy and fun. My favourite technologies at the moment are React / React Native, Redux and Node.js. Previously, I have worked with Angular 2 and Ionic 2.
              </p>
              <p>
                I am currently working for <a target='blank' href='https://olioex.com/'>OLIO</a> as a React Native developer. This allows me to do my part in reducing social inequality and environmental waste, while at the same time writing sick code!
              </p>
            </div>
            <Link to='/social' className='connect'>
              Find out more
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
