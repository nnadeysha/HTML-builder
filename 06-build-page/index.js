const path = require("path");
const fs = require("fs");
const destStyle = path.join(__dirname, "project-dist", "style.css");
const srcStyle = path.join(__dirname, "styles");
const streamStyle = fs.createWriteStream(destStyle);
const destAsset = path.join(__dirname, "project-dist", "assets");
const srcAsset = path.join(__dirname, "assets");
let arr = [];


fs.readdir(srcStyle, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach((file) => {
    let ext = path.extname(file.name).toString();
    const name = file.name.toString();
    if (file.isFile()) {
      if (ext.slice(1) == "css") {
        fs.readFile(
          path.join(__dirname, "styles", name),
          "utf-8",
          (err, data) => {
            if (err) {
            } else {
              arr.push(data.toString());
              streamStyle.write(arr.join(""));
            }
          }
          /* path.join(__dirname, 'project-dist', 'bundle.css'), */
        );
      }
    }
  });
});