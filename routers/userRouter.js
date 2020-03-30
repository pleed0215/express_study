import express from "express";
import routes from "../routes";

import { users, editProfile, userDetail, changePassword } from "../controllers/userController"

const userRouter = express.Router();

userRouter.get (routes.users, users);
userRouter.get (routes.changePassword, changePassword);
userRouter.get (routes.editProfile, editProfile);
userRouter.get (routes.userDetail(), userDetail); // 왜 userDetail(id)가 아닐까..? id를 어떻게 넣지 고민하고 있었다.

export default userRouter;