var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var paths = require('./paths');
var packageJSON = require('../package.json');

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
  VERSION: JSON.stringify(packageJSON.version),
  CUSTOMAPIHOST: false
};

module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: 'scripts/bundle.[hash:8].js',
  },
  resolve: {
    root: [
      paths.appSrc,
    ],
  },
  devtool: 'source-map',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('[name].[contenthash:8].css'),
    new CopyWebpackPlugin([
      { from: 'src/help', to: 'help' },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
      },
      inject: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  eslint: {
    configFile: paths.prodESLintConfig
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass'),
      },
      {
        test: /\.(jpg|gif|ico|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
        query: {
          name: 'images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[hash:8].[ext]'
        },
      },
    ],
  },
  sassLoader: {
    outputStyle: 'nested',
  },
  postcss: function () {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
  }
};
