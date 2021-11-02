const path = require('path');
const fs = require('fs');
//const stdout = process.stdout;   stdout.write(partData)


const pathOfFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathOfFile, 'utf-8');
stream.on('data', partData => console.log(partData));
