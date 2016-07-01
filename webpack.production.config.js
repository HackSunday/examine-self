var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: ['./src/app.js'],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass!postcss'
    }]
  },

  postcss: function () {
    return [autoprefixer]
  }
}
