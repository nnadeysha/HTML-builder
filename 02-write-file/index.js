const fs = require("fs");
const path = require("path");

const pathOfFile = path.join(__dirname, "text.txt");
const output = fs.createWriteStream(pathOfFile, "utf-8");

console.log("\nHello, enter your text here\n");
function close() {
  process.stdout.write("Удачи в изучении Node.js!");
  process.exit();
}
process.stdin.on("data", (data) => {
  if (data !== "exit") {
  }
  if (data.toString().trim() == "exit") {
    process.stdout.write("Удачи в изучении Node.js!");
    process.exit();
  }
  output.write(data);
  console.log("\nTo exit enter 'exit' or press Ctrl+c\n");
});

process.on("SIGINT", close);
