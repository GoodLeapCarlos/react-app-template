const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const PACKAGE = require('../package.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // You can adjust this based on what you're debugging but eval-cheap should cover most cases: (https://webpack.js.org/configuration/devtool/)
  devServer: {
    // contentBase
    static : {
        directory : path.join(__dirname, '..', 'public/')
      },
      port: 3000,
      // publicPath
      devMiddleware:{
         publicPath: "http://localhost:3000/",
      },
      hot: true,
      historyApiFallback: {
        disableDotRule: true
    },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      }
  },
  output: {
    publicPath: 'http://localhost:3000/',
    sourceMapFilename: '[name].map',
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: PACKAGE.name,
      // remotes: {},
      // shared: {},
    })
  ]
});