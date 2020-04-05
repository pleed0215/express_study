import express from "express";
import routes from "../routes";

import { home, search } from "../controllers/videoController";
import {
  getLogin,
  postLogin,
  postJoin,
  getJoin,
  logout,
  githubLogin,
  githubLoginCallback,
  facebookLogin,
  facebookLoginCallback,
} from "../controllers/userController";

import { onlyPublic } from "../localsMiddleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

// setting up routes for passport.
// for github passport routes
globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, githubLoginCallback);
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, facebookLoginCallback);

// get methods for error pages.
globalRouter.get(routes.errUnauthorized, (_, res) =>
  res.render("error/unauthorized")
);

//globalRouter.get (routes.users, (req, res) => res.send("Hello, this is your /users route."));
//globalRouter.get (routes.videos, (req, res) => res.send("Hello, this is your /videos route."));

export default globalRouter;
