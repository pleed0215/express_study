import express from "express";
import routes from "../routes";

import {
    users,
    getEditProfile, postEditProfile,
    userDetail,
    changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);

// /user/:id/changePassword
// Todo: make change password page.
userRouter.get(routes.changePassword(), changePassword);

// /user/:id/editProfile, post and get method.
userRouter.get(routes.editProfile(), getEditProfile);
userRouter.post(routes.editProfile(), postEditProfile);

// user/:id/userDetail
userRouter.get(routes.userDetail(), userDetail); // 왜 userDetail(id)가 아닐까..? id를 어떻게 넣지 고민하고 있었다.

export default userRouter;