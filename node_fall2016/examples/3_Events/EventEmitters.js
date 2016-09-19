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






