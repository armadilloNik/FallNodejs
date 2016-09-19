

var workIsDone = function(results) {
	console.log('The work is done! The results were: ' + results);
};

var doWork = function(input, callback) {
	var results = 2 * 2;
	callback(results);
};

doWork(10, workIsDone);