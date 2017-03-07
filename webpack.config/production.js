var webpack = require('webpack');
var path = require('path');
var config = require('./base.js');

config.devtool= 'source-map';
config.sourceMapFilename= path.join('..', 'www', 'bundle.js.map');


module.exports = config;
