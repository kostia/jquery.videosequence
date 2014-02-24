(function() {
  var express = require('express');
  var http = require('http');
  var path = require('path');

  var app = express();
  app.use(express["static"](path.join(__dirname, 'public')));

  http.createServer(app).listen(3000);
}).call(this);
