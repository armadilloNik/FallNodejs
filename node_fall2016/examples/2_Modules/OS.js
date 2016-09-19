var os = require('os');


var myMachine = {
	platform: os.platform(),
	release: os.release(),
	nics: os.networkInterfaces()

}

console.log(JSON.stringify(myMachine));