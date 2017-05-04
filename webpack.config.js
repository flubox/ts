var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  module: {
    loaders: [
        {
            "test": /\.js?$/,
            "include": [
                path.resolve(__dirname, "src")
            ],
            "loader": "babel-loader",
        },
        {
            "test": /\.css?$/,
            "loader": "style!css"
        },
        {
            "test": /\.scss?$/,
            "loader": "style!css!sass"
        }
    ]
  },
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./ directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./']
      }
    })
  ]
};
