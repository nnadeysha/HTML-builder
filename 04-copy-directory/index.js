const path = require("path");
const fs = require("fs");

const dest = path.join(__dirname, "files-copy");
const src = path.join(__dirname, "files");
/* mkdir('/tmp/a/apple', { recursive: true }, (err) => {
    if (err) throw err;
  }); */

function copyDir() {
  fs.mkdir(
    dest,
    { recursive: true },
    (err) => {
      if (err) throw err;
    },
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          const name = file.name.toString();
          fs.promises
            .copyFile(
              path.join(__dirname, "files", name),
              path.join(__dirname, "files-copy", name)
            )
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    })
  );
}
async function changeAndDelete() {
  await fs.promises.rm(dest, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });
  copyDir();
}
fs.access(dest, (err) => {
  if (err) {
    copyDir();
    console.log("Папка была создана");
  } else {
    changeAndDelete();
    console.log("Папка была изменена");
  }
});
