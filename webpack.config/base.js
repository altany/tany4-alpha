let path = require('path');
var webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  context: path.join(__dirname, '..', 'src'),
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './js/main.js'
    ]
  },
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: path.join(__dirname, '..', 'www')
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.(eot|svg|ttf|woff)/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:'./style.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()

  ],
  resolve: {
    modules: [
      path.join(__dirname, ".."),
      "node_modules"
    ]
  }
};
module.exports = config;
