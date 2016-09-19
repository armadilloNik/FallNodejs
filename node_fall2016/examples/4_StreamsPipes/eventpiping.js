
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
