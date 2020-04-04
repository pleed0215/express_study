import routes from "./routes";
import multer from "multer";

export const uploadVideo = multer({ dest: "uploads/videos/" });
export const uploadAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // this is how to use global variables in html(or pug). I can use this by javascript ie. #{ siteName }
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// form의 경로를 가져오기 위한 molter 미들웨어.
export const mwUploadVideoSingle = fieldName => uploadVideo.single(fieldName);
export const mwUploadAvatarSingle = (req, res, next) => {
  console.log("hi");
  try {
    uploadAvatar.single("avatar")(req, res, err => {
      console.log("hihi");
      if (err instanceof multer.MulterError) {
        console.log(err);
        console.log("hihihi");
      } else if (err) {
        console.log(err);
        console.log("hihihihihi");
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
