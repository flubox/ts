var restify = require('restify');
var fs = require('fs');
var a = 'http://localhost:8080/fakeimg/';
var imgList = fs.readdirSync(__dirname + '/../demo/')
.filter(f => f.match(/\.png$/))
.sort().reverse()
.reduce((accumulator, current, index, all) => {
  if (index % 2 === 0) {
    return accumulator.concat([{id: index / 2, url: [a + current, a + all[index + 1]]}]);
  }
  return accumulator;
}, [])
;
fs.writeFileSync(__dirname + '/demo.json', JSON.stringify(imgList));
var db = require('./demo.json');

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