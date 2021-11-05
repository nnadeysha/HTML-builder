const path = require("path");
const fs = require("fs");

const dest = path.join(__dirname, "project-dist", "bundle.css");

const src = path.join(__dirname, "styles");
//const name = file.name.toString();
const stream = fs.createWriteStream(dest);

let arr = [];
fs.readdir(src, { withFileTypes: true }, (err, files) => {
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
              stream.write(arr.join(""));
            }
          }
          /* path.join(__dirname, 'project-dist', 'bundle.css'), */
        );
      }
    }
  });
});

/* fs.access(dest, (err) => {
    if (err) {
      copyDir();
      console.log('Папка была создана');
    } else {
      changeAndDelete();
      console.log('Папка была изменена');
    }
  }) */
/* function copyFile(){

} */
