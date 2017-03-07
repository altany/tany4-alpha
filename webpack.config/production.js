var webpack = require('webpack');
var config = require('./base.js');

config.devtool= 'source-map';
config.sourceMapFilename= './www/bundle.js.map';


module.exports = config;
