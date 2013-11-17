// Creates a websocket with socket.io
// Make sure to install socket.io: terminal, goto /var/lib/cloud9 and enter: npm install socket.io
// Installing this takes a few minutes; wait until the installation is complete
var serverport = 8080;
var webroot = '/var/lib/cloud9/pimasters-bbb-demo';

var http = require('http');
var fs = require('fs');
var b = require('bonescript');

var app = http.createServer(function(req, res) {
	var filename = webroot + req.url;
	if (req.url == '/') filename = webroot + '/index.html';
	fs.readFile(filename, function(err, data) {
		if (err) {
			console.log('Error loading ' + filename);
			res.writeHead(404);
			res.end('Error loading ' + filename);
		}
		else {
			res.writeHead(200);
			res.end(data);
		}
	});
});

// Initialize pins
var button = "P9_12";
var ledRed = "P9_14";
var ledYellow = "P9_16";
var ledGreen = "P9_22";
b.pinMode(button, b.INPUT);
b.pinMode(ledRed, b.OUTPUT);
b.pinMode(ledYellow, b.OUTPUT);
b.pinMode(ledGreen, b.OUTPUT);
b.analogWrite(ledRed, 0);
b.analogWrite(ledYellow, 0);
b.analogWrite(ledGreen, 0);

var io = require('socket.io').listen(app);
io.set('log level', 2); // reduce logging - set 1 for warn, 2 for info, 3 for debug
io.set('browser client minification', true); // send minified client
io.set('browser client etag', true); // apply etag caching logic based on version number
io.sockets.on('connection', function(socket) {
	// listen to sockets and write analog values to LED's
	socket.on('setRed', function(data) {
		b.analogWrite(ledRed, data / 100);
	});
	socket.on('setYellow', function(data) {
		b.analogWrite(ledYellow, data / 100);
	});
	socket.on('setGreen', function(data) {
		b.analogWrite(ledGreen, data / 100);
	});
});

var buttonStatus = 0;
setInterval(function() {
	// Check the button and update the client when it changes.
	var newStatus = b.digitalRead(button);
	if (newStatus != buttonStatus) {
		buttonStatus = newStatus;
		io.sockets.emit('buttonChanged', buttonStatus);
	}
}, 100);

console.log('Server running on port :' + serverport);
app.listen(serverport);