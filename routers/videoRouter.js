import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get (routes.videos, (req, res) => res.send("This your /videos route."));
videoRouter.get (routes.upload, (req, res) => res.send("This your /videos/upload route."));
videoRouter.get (routes.videoDetail, (req, res) => res.send("This your /videos route."));
videoRouter.get (routes.editVideo, (req, res) => res.send("This your /videos route."));
videoRouter.get (routes.deleteVideo, (req, res) => res.send("This your /videos route."));

export default videoRouter;
