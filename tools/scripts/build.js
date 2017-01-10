process.env.NODE_ENV = 'production';

var chalk = require('chalk');
var clearConsole = require('react-dev-utils/clearConsole');
var fs = require('fs-extra');
var path = require('path');
var filesize = require('filesize');
var gzipSize = require('gzip-size').sync;
var rimrafSync = require('rimraf').sync;
var stripAnsi = require('strip-ansi');
var webpack = require('webpack');

var config = require('../webpack.prod');
var paths = require('../paths');

function printFileSizes(stats) {
  var assets = stats
    .toJson()
    .assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .filter(asset => /help/.test(path.dirname(asset.name)) === false)
    .map(asset => {
      var filePath = paths.appBuild + '/' + asset.name;
      var fileStats = fs.statSync(filePath);
      var fileContents = fs.readFileSync(filePath);
      var size = filesize(fileStats.size);
      var gSize = filesize(gzipSize(fileContents));
      return {
        folder: path.join(paths.appBuild + '/', path.dirname(asset.name)),
        name: path.basename(asset.name),
        sizeLabel: size + ' (' + gSize + ')',
      };
    });
  assets.sort((a, b) => b.size - a.size);
  var longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  );
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel;
    var sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    console.log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    );
  });
}

clearConsole();

console.log('Clean build directory...');
rimrafSync(paths.appBuild + '/*');
console.log(chalk.green('Done.'));
console.log();

console.log('Creating an optimized production build...');
webpack(config, (err, stats) => {
  if (err) {
    console.error('Failed to create a production build. Reason:');
    console.error(err.message || err);
    process.exit(1);
  }

  console.log(chalk.green('Done.'));
  console.log();

  console.log('File sizes (gzip):');
  console.log();
  printFileSizes(stats);
  console.log();

  console.log(chalk.yellow('To test in your browser, run "npm run start:prod"'));
  console.log();
});
