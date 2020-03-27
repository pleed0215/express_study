import express from "express";
import morgan from "morgan"; // concern Log, library.
import helmet from "helmet"; // security associated library.
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// import routers.
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();


/* all callback function in express has 3 argument, req, res and enxt 
const betweenHome = (req, res, next) => {
    console.log ("This is between home");
    next();
}*/

app.use (morgan ("dev")); // this is middlware. in using use, order really matters.
app.use (helmet());
app.use (cookieParser());

app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())


// setting up routers.
// router
app.use (routes.home, globalRouter);
//app.use(routes.users, userRouter);
app.use (routes.users, userRouter);
app.use (routes.videos, videoRouter);

export default app;