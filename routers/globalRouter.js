import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get (routes.home, (req, res) => res.send("Hello, this is your / route."));
globalRouter.get (routes.join, (req, res) => res.send("Hello, this is your /join route."));
globalRouter.get (routes.login, (req, res) => res.send("Hello, this is your /login route."));
globalRouter.get (routes.logout, (req, res) => res.send("Hello, this is your /logout route."));
globalRouter.get (routes.search, (req, res) => res.send("Hello, this is your /search route."));

globalRouter.get (routes.users, (req, res) => res.send("Hello, this is your /users route."));
globalRouter.get (routes.videos, (req, res) => res.send("Hello, this is your /videos route."));

export default globalRouter;