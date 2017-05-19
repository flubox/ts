var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
      index: path.resolve(__dirname, 'src/index.js'),
      demo: path.resolve(__dirname, 'src/demo.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
        {
            "test": /\.js?$/,
            "include": [
                path.resolve(__dirname, "src")
            ],
            "loader": "babel-loader",
        },
        {
            "test": /\.json?$/,
            "loader": "json-loader"
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'node_modules/flexboxgrid')
            ]
        }
    ]
  },
  devtool: 'source-map',
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
