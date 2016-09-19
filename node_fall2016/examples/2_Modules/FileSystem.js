var fs = require('fs');

 fs.stat('FileSystem.js', (err, stats) => {
    if (err) throw err;
    console.log(JSON.stringify(stats));
  });