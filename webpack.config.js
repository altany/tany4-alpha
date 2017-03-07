let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');

let config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './js/main.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(eot|svg|ttf|woff)/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin(path.join(__dirname, 'www', 'style.css'), {
      allChunks: true
    })
  ],
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
  },
};
module.exports = config;
