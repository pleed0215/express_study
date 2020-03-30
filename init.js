import app from "./app";
import "./db";
import dotenv from "dotenv";

import "./models/video";
import "./models/comment";

dotenv.config();

const PORT = process.env.PORT||3000;
app.listen(PORT, () => console.log(`🖐  Example app listening on port ${PORT}!`));