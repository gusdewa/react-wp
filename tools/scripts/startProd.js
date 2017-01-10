var express = require('express');

var paths = require('../paths');

var server = express();
server.use('/dist', express.static(paths.appBuild));

server.get(/\..+$/, function (req, res) {
  let filename = req.path;
  res.sendFile(paths.appBuild + filename);
});

server.get('*', function (req, res) {
  res.sendFile(paths.appBuild + '/index.html');
});

var port = 8000;
server.listen(port, function () {
  console.log('server listening on port ' + port);
});
