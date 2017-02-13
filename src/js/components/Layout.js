import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';

require('../../sass/style.sass');

class Layout extends React.Component{
  render() {
    
    const currentRoute = this.props.routes[this.props.routes.length - 1];
  
    return (
      <div>
        <div className='wrapper'>
          <Header />
          <div className='pageContent' id={currentRoute.path?currentRoute.path:'home'}>
            {this.props.children}
          </div>
          <div className='push'></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
