import routes from "./routes";
import multer from "multer";

export const uploadVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // this is how to use global variables in html(or pug). I can use this by javascript ie. #{ siteName }
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 5
  };
  next();
};

// form의 경로를 가져오기 위한 molter 미들웨어.
export const mwUploadVideoSingle = fieldName => uploadVideo.single(fieldName);
