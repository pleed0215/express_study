import express from "express";
import morgan from "morgan"; // concern Log, library.
import helmet from "helmet"; // security associated library.
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import passport from "passport";
import session from "express-session";
import "./passport";

console.log(process.env.COOKIE_SECRET);
// import routers.
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import { localsMiddleware } from "./localsMiddleware";

const app = express();

/* all callback function in express has 3 argument, req, res and enxt 
const betweenHome = (req, res, next) => {
    console.log ("This is between home");
    next();
}*/


// setting up view engine with pug.
app.set("view engine", "pug");

// set static
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// setting up middlewares.
app.use(helmet()); // security associated package
app.use(morgan("dev")); // this is middlware. in using use, order really matters.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,

}));
app.use(passport.initialize());
app.use(passport.session());

/* setting up session */


// for using routes as local.
app.use(localsMiddleware);

// setting up routers.
// router
app.use(routes.home, globalRouter);
//app.use(routes.users, userRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
