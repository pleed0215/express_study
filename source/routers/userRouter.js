import express from "express";
import routes from "../routes";

import {
  users,
  getEditProfile,
  postEditProfile,
  userDetail,
  getChangePassword,
  postChangePassword
} from "../controllers/userController";

import { onlyPrivate, uploadAvatar } from "../localsMiddleware";

const userRouter = express.Router();

userRouter.get(routes.users, users);

// /user/:id/changePassword
// Todo: make change password page.
userRouter.get(routes.changePassword(), onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword(), onlyPrivate, postChangePassword);

// /user/:id/editProfile, post and get method.
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile(),
  uploadAvatar.single("avatar"),
  postEditProfile
);

// user/:id/userDetail
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
