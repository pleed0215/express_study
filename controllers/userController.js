import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "/Join" });

export const postJoin = async (req, res, next) => {
  //console.log(req.body); // bodyParser package 덕분임. 그래서 쉽게 post 된 내용을 확인 가능하다.
  const {
    body: {
      name, email, password, password2
    }
  } = req;

  if (req.body.password !== req.body.password2) {
    console.log("each password is not coincided.");
    res.status(400);
    res.render("join", { pageTitle: "/Join" });
  } else {
    // TODO: Register user as input, and log in.
    try {
      const newUser = await User({ name, email });
      await User.register(newUser, password);
      next();
    }
    catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "/login" });
export const postLogin = passport.authenticate('local', {
  failrueRedirect: routes.login,
  successRedirect: routes.home
});

// TODO: process to logout
export const logout = (req, res) => {
  res.locals.user.isAuthenticated = false;
  // res.render ("logout", {pageTitle: "/logout"});
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "/users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "/userDetail" });
export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "/editProfile" });
}
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email }
  } = req;
  console.log(name, email, req.user._id);
  await User.findByIdAndUpdate(req.user._id, { name, email });
  res.redirect(routes.userDetail(req.user._id));
}

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "/changePassword" });
