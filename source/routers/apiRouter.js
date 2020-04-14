import express from "express";
import routes from "../routes";
import { postRegisterView, postRegisterComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.registerComment, postRegisterComment);

export default apiRouter;