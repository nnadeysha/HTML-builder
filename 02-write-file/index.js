const fs = require("fs");
const path = require("path");
const stdout = process.stdout;
const stdin = process.stdin;

const pathOfFile = path.join(__dirname, "text.txt");
const output = fs.createWriteStream(pathOfFile, "utf-8");

console.log("\nHello, enter your text here\n");

stdin.on("data", (data) => {
  if (data.toString().trim() == "exit") {
    process.exit();
  }
  output.write(data);
  console.log("\nTo exit enter 'exit' or press Ctrl+c\n");
});

process.on("exit", () => stdout.write("Удачи в изучении Node.js!"));
/* 
  const input = fs.createReadStream('data.txt', 'utf-8');
  const output = fs.createWriteStream('data.md');
  
  input.pipe(output); */
