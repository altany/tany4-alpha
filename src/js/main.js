import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';

function isTouchDevice() {
	return 'ontouchstart' in window        // works on most browsers
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

ReactDOM.render(
  Router,
  document.getElementById('root')
);
console.log('Hello World!');
//var url = require("./../sass/icomoonfonts/icomoon.svg");
//console.log('!!!!!!!',url);
document.getElementsByTagName('body')[0].classList.add(isTouchDevice()?'touch':'no-touch');
