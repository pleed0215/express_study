import app from "./app";
import "./db";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT||3000;
console.log (PORT);
app.listen(PORT, () => console.log(`🖐  Example app listening on port ${PORT}!`));