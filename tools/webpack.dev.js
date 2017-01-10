var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var autoprefixer = require('autoprefixer');
var validate = require('webpack-validator');
var webpack = require('webpack');

var paths = require('./paths');
var packageJSON = require('../package.json');

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true,
  VERSION: JSON.stringify(packageJSON.version),
  CUSTOMAPIHOST: JSON.stringify(packageJSON.apiHostname)
};

module.exports = validate({
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: 'scripts/bundle.js',
    sourceMapFilename: 'scripts/bundle.map',
  },
  resolve: {
    root: [
      paths.appSrc,
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9005' })
  ],
  eslint: {
    configFile: paths.devESLintConfig
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass'],
      },
      {
        test: /\.(ttf|eot|svg|gif|ico|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
    ],
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
  },
});
