const fs = require('fs');
const path = require('path');
const { basename } = require('path/posix');

/**
 * @typedef IFileInfo
 * @property {string} name
 * @property {number} size
 */
/**
 *
 * @param {string} folder
 * @param {(info: IFileInfo)=>void} callback
 */

function readFiles(folder, callback) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    let arr = [];
    let result = [];
    files.forEach((file) => {
      if (file.isDirectory() == false) {
        fs.stat(path.join(folder, file.name), (err, stats) => {
          let ext = path.extname(file.name);
          let kbSize = stats.size / 2 ** 10;
          let bName = basename(file.name, ext);
          console.log(  bName + '  -  '+ ext.slice(1)+'  -  '+ kbSize + 'kb' );
          /* 
          arr.push(true);
          result.push({ size: kbSize, name: file.name, ext: ext });
          if (arr.length == files.length) {
            callback(result);
          } */
        });
      } /* else {
        readFiles(path.join(folder, file.name), (res) => {
          result = [...result, ...res];
          arr.push(true);
          if (arr.length == files.length) {
            callback(result);
          }
        });
      } */
    });
  });
}
readFiles(path.join(__dirname, 'secret-folder'), (res) => {
  console.log(res);
});

