import express from "express";
import routes from "../routes";

import { home, search } from "../controllers/videoController"
import {
    getLogin, postLogin,
    postJoin, getJoin,
    logout
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);


globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

//globalRouter.get (routes.users, (req, res) => res.send("Hello, this is your /users route."));
//globalRouter.get (routes.videos, (req, res) => res.send("Hello, this is your /videos route."));

export default globalRouter;