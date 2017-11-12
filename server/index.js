var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
var rx = require('rxjs');
var HttpObservable = require('http-observable');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  var subscription = null;

  socket.on('disconnect', function () {
    console.log('user disconnected');
    if (subscription) {
      subscription.unsubscribe();
    }
  });

  socket.on('pingItems', function (pingItems) {

      console.log('Start ping');

      if (subscription) {
        subscription.unsubscribe();
      }

      subscription = rx.Observable.interval(3000)
        .flatMap(function () {
          return rx.Observable.from(pingItems);
        })
        .switchMap(function (pingItem) {
          var urlParsed = url.parse(pingItem.url);
          var options = {method: 'HEAD', host: urlParsed.host, port: urlParsed.port, path: '/'};

          return rx.Observable.of({pingItem: pingItem, request: HttpObservable(options).request().status()});
        })
        .catch(function (err) {
          console.log('error!!1');
          console.log(err);
          return Observable.empty();
        })
        .subscribe(function (result) {
          result.request.subscribe(function (t) {
            var statusCode = t.statusCode;

            if (statusCode >= 400) {
              console.log(result.pingItem.url + ' is not available');
              io.emit('message', {
                available: false,
                url: result.pingItem.url
              });
            } else {
              console.log(result.pingItem.url + ' is available');
              io.emit('message', {
                available: true,
                url: result.pingItem.url
              });
            }
          }, function (error) {
            io.emit('message', {
              available: false,
              url: result.pingItem.url
            });
            console.log(result.pingItem.url + ' is not available');
          })
        });
    }
  );
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
