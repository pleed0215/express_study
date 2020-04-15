import "@babel/polyfill";

import "./myEnv";

import "./models/Comment";
import "./models/video";
import "./models/User";

import app from "./app";
import "./db";

const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () =>
  console.log(`🖐  Example app listening on port ${PORT}!`)
);
