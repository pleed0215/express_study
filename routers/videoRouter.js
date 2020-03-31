import express from "express";
import routes from "../routes";
import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";
import { mwUploadVideoSingle } from "../localsMiddleware";

const videoRouter = express.Router();

// /videos, get method post handler
videoRouter.get(routes.videos, videos);

// /videos/upload, get and post method handler
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, mwUploadVideoSingle("videofile"), postUpload);

// /videos/:id, get method handler
videoRouter.get(routes.videoDetail(), videoDetail); // 왜... videoDetail(id)이 아닐까..?

// /videos/:id/edit, get and post method handler
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
