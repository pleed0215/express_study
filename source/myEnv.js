import dotenv from "dotenv";
import path from "path";

console.log(path.join(__dirname, "../", ".env"));
const result = dotenv.config({
  path: path.join(__dirname, "../", ".env"),
});
console.log(result);
