import mongoose from "mongoose";

console.log(process.env.MONGODB_URL);

// env 사용에는 두가지 방법이 있음. .env 파일을 이용할 수도 있고
// 시작단계에서도 설정할 수 있다. package.json scripts 확인할 것.
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// initializing mongoose.
export const db = mongoose.connection;

db.once("open", () => console.log("Connected to DB"));
db.on("error", (error) =>
  console.log("Error to connect DB.\nError obj: " + error)
);
