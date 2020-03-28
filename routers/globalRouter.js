import express from "express";
import routes from "../routes";

import { home, search } from "../controllers/videoController"
import { join, login, logout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get (routes.home, home);
globalRouter.get (routes.join, join);
globalRouter.get (routes.login, login);
globalRouter.get (routes.logout, logout);
globalRouter.get (routes.search, search);

//globalRouter.get (routes.users, (req, res) => res.send("Hello, this is your /users route."));
//globalRouter.get (routes.videos, (req, res) => res.send("Hello, this is your /videos route."));

export default globalRouter;