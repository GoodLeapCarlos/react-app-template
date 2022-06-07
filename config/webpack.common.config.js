const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry:  path.resolve(__dirname, '..', 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '..', 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            sync: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic'
                },
              },
              target: 'es5',
              loose: false,
              externalHelpers: true,
              keepClassNames: false,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // https://github.com/graphql/graphql-js/issues/2721#issuecomment-723008284
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      // TODO: Do we need this still?
      {
        test: /\.(gif|svg|jpg|png|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer'),
      fs: false,
      tls: false,
      net: false,
    },
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
};
