const path = require("path");
const fs = require("fs");
const destStyle = path.join(__dirname, "project-dist", "style.css");
const srcStyle = path.join(__dirname, "styles");
const streamStyle = fs.createWriteStream(destStyle);
const destAsset = path.join(__dirname, "project-dist", "assets");
const srcAsset = path.join(__dirname, "assets");
const tempFile = fs.createReadStream(path.join(__dirname, "template.html"),"utf-8");
const indFile = fs.createWriteStream(path.join(__dirname, "project-dist", "index.html"));


fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

tempFile.on("data", async (data) => {
  const htmlResult = await htmlBuild();
  indFile.write(htmlResult);

  async function htmlBuild() {
    let html = data.toString();
    const tags = html.match(/{{[a-zA-Z]*}}/gi);

    for (let item of tags) {
      const tagName = item.substr(2, item.length - 4);

      const componentHTML = await fs.promises.readFile(
        path.join(__dirname, "components", `${tagName}.html`)
      );
      html = html.replace(item, componentHTML.toString());
    }
    
    return html;

  }
});


fs.readdir(srcStyle, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach((file) => {
    let ext = path.extname(file.name).toString().split(".")[1];
    const name = file.name.toString();
    if (file.isFile()) {
      if ( ext == "css") {
        fs.readFile(
          path.join(__dirname, "styles", name),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            let arr = [];
            const st = data.toString()
              arr.push(st);
              //streamStyle.write(arr);

              for (let i = 0; i < arr.length; i++) {
                streamStyle.write(arr[i]);
              }
            
          }
        );
      }
    }
  });
});
fs.access(destAsset, function (error) {
  if (error) {
    console.log('The file is ready for viewing')
    copyAssets();
  } else {
    changeAndDelete();
  }
});




function copyAssets() {
  fs.promises.mkdir(destAsset, { recursive: true });
  copyFiles(srcAsset, destAsset);
  
}

async function changeAndDelete() {
  await fs.promises.rm(destAsset, { recursive: true });
  await fs.promises.mkdir(destAsset, { recursive: true });
  copyFiles(srcAsset, destAsset);
}
function copyFiles(src, dest) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        const name = file.name.toString();
        const pathOfSrc = path.join(src, name);
        const pathOfDest = path.join(dest, name);
        if (file.isDirectory()) {
          fs.promises.mkdir(pathOfDest, { recursive: true });
          copyFiles(pathOfSrc, pathOfDest);
        } else if (file.isFile()) {
          fs.promises.copyFile(pathOfSrc, pathOfDest).catch(function (error) {
            console.log(error);
          });
        }
      });
    }
  });
}
