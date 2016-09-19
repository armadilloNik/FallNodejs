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
OS, Path, FS
```
- require() & your modules
``` 
show examples of directory hopping 
```
``` 
module.exports 
```
```
show example of function 
```
``` 
show example of an object style 
```
- npmjs.org
- npm init
- npm install
```
request example here
```
- npm install --save
- npm install --save-dev
- npm install -g
- nodemon


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
