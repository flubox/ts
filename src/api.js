var restify = require('restify');
var db = require('./demo.json');
 
var server = restify.createServer({
  name: 'fake api',
  version: '1.0.0'
});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
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