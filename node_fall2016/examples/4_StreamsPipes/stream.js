
var request = require('request');

var webRequest = request('http://www.improving.com');

webRequest.on('data', function(dataChunk){
	console.log('data chunk read!!!!!!!!!!!!!!!!!!!!!!!');
});

webRequest.on('end', function(){
	console.log('finished reading all chunks!!');
});

