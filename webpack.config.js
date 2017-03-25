let path = require('path');
var webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  context: path.join(__dirname, 'src'),
  output: {
    filename: 'bundle.js',
    publicPath: path.join(__dirname, 'www')
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.sass$/,
        //loader: ExtractTextPlugin.extract('css-loader!sass-loader')
        use: ExtractTextPlugin.extract({
           use:"css-loader!sass-loader",
           fallback: 'style-loader'
        })
      },
      {
        test: /\.(eot|svg|ttf|woff)/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:'style.css',
      disable: false,
      allChunks: true
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname),
      "node_modules"
    ]
  }
};

switch (process.env.NODE_ENV) {
  case 'dev':
    config.entry= {
      app: [
        'webpack-hot-middleware/client',
        './js/main.js'
      ]
    };
    config.devtool= 'cheap-module-source-map';
    config.output.path= '/';
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  break;
  case 'production':
  default:
  config.entry= {
    app: [
      './js/main.js'
    ]
  }
  config.devtool= 'source-map';
  config.output.path= path.join(__dirname, 'www');
}
module.exports = config;
