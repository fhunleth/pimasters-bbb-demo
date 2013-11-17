// Creates a websocket with socket.io
// Make sure to install socket.io: terminal, goto /var/lib/cloud9 and enter: npm install socket.io
// Installing this takes a few minutes; wait until the installation is complete

var serverport = 8080

var http = require('http');
var fs = require('fs');

var app = http.createServer(function(req, res) {
    var filename = '.' + req.url;
    if (req.url == '/')
	filename = 'index.html';
    fs.readFile(filename, function(err, data) {
	if (err) {
	    console.log('Error loading ' + filename);
	    res.writeHead(404);
	    res.end('Error loading ' + filename);
	} else {
	    res.writeHead(200);
	    res.end(data);
	}
    });
});

var io = require('socket.io').listen(app);
io.set('log level', 2);   // reduce logging - set 1 for warn, 2 for info, 3 for debug
io.set('browser client minification', true);  // send minified client
io.set('browser client etag', true);  // apply etag caching logic based on version number

io.sockets.on('connection', function(socket) {
  // listen to sockets and write analog values to LED's
  socket.on('setRed', function (data) {
    console.log('Red: ' + data);
  });
  socket.on('setGreen', function (data) {
    console.log('Green: ' + data);
  });
  socket.on('setYellow', function (data) {
    console.log('Yellow: ' + data);
  });
});

var onoroff = 1;
setInterval(function() {
    if (onoroff == 1)
	onoroff = 0;
    else
	onoroff = 1;
    io.sockets.emit('buttonChanged', onoroff);
}, 1000);


console.log('Server running on port :' + serverport);
app.listen(serverport);
