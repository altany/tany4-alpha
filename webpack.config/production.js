var path = require('path');
var config = require('./base.js');

config.devtool= 'source-map';
config.sourceMapFilename= path.join('..', 'www', 'bundle.js.map');
config.entry.app = ['./js/main.js'];
config.output.path = path.join(__dirname, '..', 'www');
config.plugins = [];
module.exports = config;
