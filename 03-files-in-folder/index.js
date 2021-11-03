const fs = require("fs");
const path = require("path");

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
          let kbSize = stats.size / 2 ** 10;
          //console.log(kbSize  + file.name);
          arr.push(true);
          result.push({ size: kbSize, name: file.name });
          if (arr.length == files.length) {
            callback(result);
          }
        });
      } else {
        readFiles(path.join(folder, file.name), (res) => {
          result = [...result, ...res];
          arr.push(true);
          if (arr.length == files.length) {
            callback(result);
          }
        });
      }
    });
  });
}
readFiles(path.join(__dirname, "secret-folder"), (res) => {
  console.log(res);
});
//console.log(path.extname(file.name))
