import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';

require('../../sass/style.sass');

const Layout = React.createClass({
  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <Header />
          <div className='pageContent' id='home'>
            {this.props.children}
          </div>
          <div className='push'></div>
        </div>
        <Footer />
      </div>
    );
  }
});

export default Layout;
