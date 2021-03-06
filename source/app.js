import express from "express";
import morgan from "morgan"; // concern Log, library.
import helmet from "helmet"; // security associated library.
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passport";

// import routers.
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";

import { localsMiddleware } from "./localsMiddleware";

const app = express();

// setting up view engine with pug.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// set static
app.use("/uploads", express.static("./uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));

// setting up middlewares.
app.use(helmet()); // security associated package
app.use(morgan("dev")); // this is middlware. in using use, order really matters.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

/* setting up for session */
const CookieStore = MongoStore(session);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// for using routes as local.
app.use(localsMiddleware);

// setting up routers.
// router
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
