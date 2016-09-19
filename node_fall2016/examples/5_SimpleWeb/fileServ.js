var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res){
	if(req.url === '/')
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + '/index.html').pipe(res);
	}
	else
	{
		fs.exists(__dirname + '/public' + req.url, function(exists) { 
		  if (exists) { 
		    fs.createReadStream(__dirname + '/public'  + req.url).pipe(res);
		  } 
		 else{
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end("don't tase me bro!");
		}
		}); 
	}
});

server.listen(1701, 'localhost');