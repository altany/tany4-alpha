import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Layout
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Home from './components/Home';
import Social from './components/Social';
import Github from './components/Github';

require('../sass/style.sass');

function isTouchDevice() {
	return 'ontouchstart' in window        // works on most browsers
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

const App = () => (
	<BrowserRouter>
		<div>
      <div className='wrapper'>
			 <Header />
			 <div className='pageContent'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path="/social" component={Social} />
				<Route path="/github" component={Github} />
			</Switch>
      </div>
			 <div className='push'> </div>
			 </div>
			 <Footer />
		</div>
	</BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById('root'));
console.log('Tany4 - Welcome to my page!');
document.getElementsByTagName('body')[0].classList.add(isTouchDevice()?'touch':'no-touch');
