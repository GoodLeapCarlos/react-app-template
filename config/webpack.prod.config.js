const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const PACKAGE = require('../package.json');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
    new CssMinimizerPlugin(),
    // TODO: Decide whether to stick with swc to avoid extra dependencies (esbuild is faster though).
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
            format: {
              comments: false,
            }
          },
          extractComments: false,
      }),
    // new TerserPlugin({
    //     // all legal comments are preserved with esbuildMinify
    //     minify: TerserPlugin.esbuildMinify,
    //     terserOptions: {},
    //   }),
    ],
    splitChunks: {
        chunks: 'all',
      },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].[chunkhash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '..', 'public/images'), to: 'images' },
        {
          from: path.resolve(__dirname, '..', 'public/manifest.json'),
        },
        {
          from: path.resolve(__dirname, '..', 'public/favicon.ico'),
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: PACKAGE.name,
      // remotes: {},
      // shared: {},
    })
  ],
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/',
    clean: true,
  },
});
