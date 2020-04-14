import routes from "./routes";
import multer from "multer"; // for upload
import multerS3 from "multer-s3"; // for upload S3 with multer
import awsSdk from "aws-sdk"; // amazon web service sdk

const awsS3 = new awsSdk.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY,
});



// import Video model
import Video from "./models/video";

export const uploadVideo = multer({
  storage: multerS3({
    s3: awsS3,
    acl: 'public-read',
    bucket: 'pleedwetube/videos',
  }),
});
//export const uploadAvatar = multer({ dest: "uploads/avatars/" });
export const uploadAvatar = multer({
  storage: multerS3({
    s3: awsS3,
    acl: 'public-read',
    bucket: 'pleedwetube/avatars',
  }),
});

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

export const isYou = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  console.log(req.params);
  const reqVideo = await Video.findById(id);

  console.log(
    `REQUESTED VIDEO CREATOR ID\n
  type: ${typeof reqVideo.creator},
  value: ${reqVideo.creator}\n
  CURR USER ID\n
  type: ${typeof req.user.id},
  value: ${req.user.id}`
  );

  if (reqVideo.creator == req.user.id) {
    console.log("User verified");
    next();
  } else {
    res.status(400);
    console.log("Not authroized User!");
    res.redirect("/error/unauthorized");
  }
};

// form의 경로를 가져오기 위한 molter 미들웨어.
export const mwUploadVideoSingle = (fieldName) => uploadVideo.single(fieldName);
export const mwUploadAvatarSingle = (req, res, next) => {
  console.log("hi");
  try {
    uploadAvatar.single("avatar")(req, res, (err) => {
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
