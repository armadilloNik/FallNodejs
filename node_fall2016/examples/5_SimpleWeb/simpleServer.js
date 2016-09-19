var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	res.end('Whoa it worked!');
});

server.listen(1701, 'localhost');