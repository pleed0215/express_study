// because of totally client side JS (in contrast to nodejs), cannot use babel..
// So, have to wrtie conventional JS.
const path = require("path");
const dotenv = require("dotenv");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

// resolve, join 차이. resolve는 인수에 절대경로가 들어있으면 절대 경로 우선.
const ENTRY_FILLE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

dotenv.config();
// module, rulres 의 /\(.scss)$/ 은 정규표현식임.
module.exports = {
  // babel/polyfill은 브라우저가 nodejs를 다 이해하는 건 아니라서.. async나 await..
  entry: ["@babel/polyfill", ENTRY_FILLE],
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  mode: process.env.WEBPACK_ENV,
  module: {
    rules: [
      // rules for babel. js.
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      // rules for scss
      {
        test: /\.scss$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
            /*
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }*/
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  plugins: [new ExtractCSS("styles.css")]
};
