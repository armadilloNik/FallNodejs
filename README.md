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
syntax example
```
- Why Event Emitters. callbacks give one opportunity to handle things. Emitters can give plenty of opportunity to react more often and in nice ways.
```
show a simple example. use one of the previous examples and re-write it
```

## Streams & Pipes

## Simple Web

## Testing
