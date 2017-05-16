var restify = require('restify');
var db = require('./demo.json');
var fs = require('fs');
var img = fs.readdirSync(__dirname + '/../demo/');
console.info('...', 'img', img);
 
var server = restify.createServer({
  name: 'fake api',
  version: '1.0.0'
});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('/fakeimg/:filename', function (req, res) {
  var filename = req.params.filename;
  fs.exists(__dirname + '/../demo/' + filename, function (exists) {
    if (exists) {
      fs.readFile(__dirname + '/../demo/' + filename, function(err, data) {
        if (err) {
          res.send(500, err);
          return;
        } else {
          res.setHeader('Content-Type', 'image/png');
          res.send(data);
        }
      });
    } else {
      res.send(404, new Error('not found'));
    }
  });
});

server.get('/fakeapi', function (req, res) {
  if (db) {
    res.send(db);
  } else {
    res.send(404, new Error('not found'));
  }
});
 
server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url, 'db', db);
});