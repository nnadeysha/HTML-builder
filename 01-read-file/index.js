const path = require('path');
const fs = require('fs');
const stdout = process.stdout;


const pathOfFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathOfFile, 'utf-8');
stream.on('data', partData => stdout.write(partData));
