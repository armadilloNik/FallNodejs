# Node.js ImprovingU Fall 2016

## The Basics
- Introductions
- What is Node.js?
- Installing Node
- The Event Loop & Non-Blocking IO
- Callbacks
```
var workIsDone = function(results) {
	console.log('The work is done! The results were: ' + results);
};

var doWork = function(input, callback) {
	var results = 2 * 2;
	callback(results);
};

doWork(10, workIsDone);
```
- Example 1 : Random Work
```
 var doSomeWork = function(input, handle){
	var timeToWait = parseInt(Math.random()*(1000));
	console.log("Calling for: " + input);
	setTimeout(function(){
		handle(null, input);
	}, timeToWait)
}

var handle = function(error, results) {
	if(error){
		console.log("Error: " + error.message)
	}
	else {
		console.log("The results for: " + results);
	}
}

for(i = 0; i < 10; i ++){
	doSomeWork(i, handle);
}
```

## Modules
- require() & Built-in Modules
``` 
var os = require('os');


var myMachine = {
	platform: os.platform(),
	release: os.release(),
	nics: os.networkInterfaces()

}

console.log(JSON.stringify(myMachine));
```
``` 
var fs = require('fs');

 fs.stat('FileSystem.js', (err, stats) => {
    if (err) throw err;
    console.log(JSON.stringify(stats));
  });
```
``` 
var path = require('path');


console.log(path.basename('Path.js'));
console.log(path.extname('Path.js'));
```
- require() & your modules
``` 
//myfsapp.js
var myfs = require('./myfs');
var yo = myfs.showFileStats('FileSystem.js');

//myfs.js
var fs = require('fs');


function showFileStats(fileName) {
	fs.stat(fileName, 
		(err, stats) => {
    		if (err) throw err;
    console.log(JSON.stringify(stats));
	});
	
};

module.exports.showFileStats = showFileStats;
```
```
//Person.js
function Person(first, last){
	this.firstName = first;
	this.lastName = last;
}

module.exports = Person;
//PersonApp.js
var Person = require('./person');
var johnnyBravo = new Person('Johnny', 'Bravo');
console.log(JSON.stringify(johnnyBravo));

```
- npmjs.org
- npm init
- npm install
```
request package example here
```

- npm install --save
- npm install --save-dev
- npm install -g
- nodemon
```
show how nodemon works
```


## Event Emitters 
- describe emitters
- show the syntax vs the earlier callback syntax
```
// So instead of
var doSomeWork = function(input, callback){...}
var callback = function(err, results){...}

// we can do this
var doSomeWork = function(input){...}
var dw = doSomeWork(input);
dw.on('calling', ...);
dw.on('done', ...);
```
- Why Event Emitters. callbacks give one opportunity to handle things. Emitters can give plenty of opportunity to react more often and in nice ways.
```
var EventEmitter = require('events').EventEmitter;

var doSomeWork = function(input){
	var timeToWait = parseInt(Math.random()*(1000));

	var emitter = new EventEmitter();
	
	process.nextTick(function(){
		emitter.emit('calling', input);
		setTimeout(function(){
				emitter.emit('done', input);		
			},timeToWait)
	});
	return emitter;
};

var dw = doSomeWork(10);

dw.on('calling', function(input){
	console.log('calling for: ' + input);
});

dw.on('done', function(input){
	console.log('work completed for: ' + input);
});
```

## Streams & Pipes
- readable streams
```
var request = require('request');

var webRequest = request('http://www.improving.com');

webRequest.on('data', function(dataChunk){
	console.log('data chunk read!!!!!!!!!!!!!!!!!!!!!!!');
});

webRequest.on('end', function(){
	console.log('finished reading all chunks!!');
});
```
- writable streams
```
var request = require('request');
var fs = require('fs');

var webRequest = request('http://www.improving.com');
var writeStream = fs.createWriteStream('improving.html');

process.nextTick(function(){
	webRequest.pipe(writeStream);
});

webRequest.on('data', function(dataChunk){
	console.log('data chunk read!!!!!!!!!!!!!!!!!!!!!!!');
});

webRequest.on('end', function(){
	console.log('finished reading all chunks!!');
});
```
- Piping events
```

var request = require('request');
var fs = require('fs');

var webRequest = request('http://download.thinkbroadband.com/512MB.zip');
var writeStream = fs.createWriteStream('512MB.zip');

process.nextTick(function(){


webRequest.pipe(writeStream);
});
webRequest.on('data', function(dataChunk){
	console.log('data chunk read!!!!!!!!!!!!!!!!!!!!!!!');
	
});

webRequest.on('end', function(){
	console.log('finished reading all chunks!!');
});

writeStream.on('pipe', function(){ console.log('has been piped!');});
writeStream.on('drain', function(){ console.log('write buffer empty');});

```

## Simple Web
- using the built in module 'http' let's stand up a very simple server
```
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	res.end('Whoa it worked!');
});

server.listen(1701, 'localhost');
```
- let's serve up a static index.html file so we have a landing spot!
```
var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res){
	if(req.url === '/')
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + '/index.html').pipe(res);
	}
	else{
		res.writeHead(500, {'Content-Type': 'text/html'});
		res.end("don't tase me bro!");
	}
});

server.listen(1701, 'localhost');
```
- let's route to some other static files that we might have laying around!
```
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
```
