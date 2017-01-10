process.env.NODE_ENV = 'development';

var WebpackDevServer = require('webpack-dev-server');
var chalk = require('chalk');
var clearConsole = require('react-dev-utils/clearConsole');
var webpack = require('webpack');

var config = require('../webpack.dev');

var compiler = webpack(config);

var host = 'localhost';
var port = 9005;
var devServer = new WebpackDevServer(compiler, {
  contentBase: config.output.path,
  hot: true,
  historyApiFallback: true,
  compress: true,
  clientLogLevel: "info",
  quiet: false,
  noInfo: false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },

  publicPath: config.output.publicPath,
  stats: { colors: true }
});

devServer.listen(port, host, function (err) {
  if (err) {
    return console.log(err);
  }

  clearConsole();
  console.log(chalk.cyan('Starting the development server...'));
  console.log();
  return undefined;
});
