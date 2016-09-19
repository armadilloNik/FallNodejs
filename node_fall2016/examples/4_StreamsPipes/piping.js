
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