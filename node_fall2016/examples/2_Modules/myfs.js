var fs = require('fs');


function showFileStats(fileName) {
	fs.stat(fileName, 
		(err, stats) => {
    		if (err) throw err;
    console.log(JSON.stringify(stats));
	});
	
};

module.exports.showFileStats = showFileStats;