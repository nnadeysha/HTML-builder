const path = require('path');
const fs = require('fs');


const pathOfFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathOfFile, 'utf-8');
stream.on('data', partData => console.log(partData));
stream.on('end', ()=> {console.log("End")})