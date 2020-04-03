import express from "express";
import routes from "../routes";

import {
  users,
  getEditProfile,
  postEditProfile,
  userDetail,
  changePassword
} from "../controllers/userController";

import { onlyPrivate } from "../localsMiddleware";

const userRouter = express.Router();

userRouter.get(routes.users, users);

// /user/:id/changePassword
// Todo: make change password page.
userRouter.get(routes.changePassword(), onlyPrivate, changePassword);

// /user/:id/editProfile, post and get method.
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile(), postEditProfile);

// user/:id/userDetail
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
