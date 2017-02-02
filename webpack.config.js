var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//TODO: CHANGE FOR PRODUCTION
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, './static/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.js$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ['react-hmre']
        }
      },

      { test: /\.css$/, loader: 'style-loader!css-loader' },


    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css']
    }
  }
}
