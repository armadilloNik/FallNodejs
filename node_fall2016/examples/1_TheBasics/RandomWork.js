
var doSomeWork = function(input, handle){
	var timeToWait = parseInt(Math.random()*(1000));
	console.log("Calling for: " + input);
	setTimeout(function(){
		handle(null, input);
	},timeToWait)
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

