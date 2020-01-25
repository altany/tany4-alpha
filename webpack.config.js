let path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  context: path.join(__dirname, "src"),
  output: {
    filename: "bundle.js",
    publicPath: path.join(__dirname, "www")
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff)/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      disable: false,
      allChunks: true
    })
  ],
  resolve: {
    modules: [path.join(__dirname), "node_modules"]
  }
};

module.exports = [
  {
    output: {
      filename: "./dist-amd.js",
      libraryTarget: "amd"
    },
    entry: "./app.js",
    mode: "production"
  },
  {
    output: {
      filename: "./dist-commonjs.js",
      libraryTarget: "commonjs"
    },
    entry: "./app.js",
    mode: "production"
  }
];
module.exports = (env, argv) => {
  config.mode = (argv && argv.mode) || "production";
  if (config.mode === "production") {
    config.entry = {
      app: ["./js/App.js"]
    };
    config.devtool = "source-map";
    config.output.path = path.join(__dirname, "www");
  }
  if (config.mode === "development") {
    config.entry = {
      app: ["webpack-hot-middleware/client", "./js/App.js"]
    };
    config.devtool = "cheap-module-source-map";
    config.output.path = "/";
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  return config;
};
