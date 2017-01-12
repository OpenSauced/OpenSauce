// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname, 'app', 'src'),

  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    './index'
  ],

  output: {
    path: path.join(__dirname, 'app', 'public/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css', {allChunks: false}),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'react-hot'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      // {
      //   test: /\.scss$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
      // },
      // {
      //   test: /\.css$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      // }
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["style-loader", "css-loader", "autoprefixer-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};
