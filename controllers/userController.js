import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// /join POST, GET method.
export const getJoin = (req, res) => res.render("join", { pageTitle: "/Join" });
export const postJoin = async (req, res, next) => {
  // console.log(req.body); // bodyParser package 덕분임. 그래서 쉽게 post 된 내용을 확인 가능하다.
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    console.log("each password is not coincided.");
    res.status(400);
    res.render("join", { pageTitle: "/Join" });
  } else {
    // TODO: Register user as input, and log in.
    try {
      const newUser = await User({ name, email });
      await User.register(newUser, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// /login POST, GET method.
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "/login" });
export const postLogin = passport.authenticate("local", {
  failrueRedirect: routes.login,
  successRedirect: routes.home,
});

// /logout GET method
export const logout = (req, res) => {
  req.logout();
  // res.render ("logout", {pageTitle: "/logout"});
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "/users" });

// /users/:id, GET method.
export const userDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const reqUser = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "/userDetail", reqUser });
  } catch (error) {
    console.log(error);
    res.status(200);
    res.redirect(routes.home);
  }
};

// users/:id/edit-profile, GET, POS method.
export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "/editProfile" });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;

  console.log("user avatar is ", req.user.avatarUrl);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      avatarUrl: !req.user.avatarUrl ? `/${file.path}` : req.user.avatarUrl,
    });
    res.redirect(routes.userDetail(req.user._id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// users/:id/change-password, GET method.
// TODO: need to wrtie POST method code.
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "/changePassword" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldpassword, password1, password2 },
  } = req;

  try {
    if (password1 === password2) {
      await req.user.changePassword(oldpassword, password1);
    } else {
      res.status(400);
      res.render(routes.changePassword(req.user.id), {
        pageTitle: "Verify your password!",
        inputError: true,
      });
    }
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};

// CALLBACK Method for passport
// for github
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = passport.authenticate("github", {
  failrueRedirect: routes.login,
  successRedirect: routes.home,
});

// for facebook
export const facebookLogin = passport.authenticate("facebook", {
  scope: ["email"],
});
export const facebookLoginCallback = passport.authenticate("facebook", {
  failrueRedirect: routes.login,
  successRedirect: routes.home,
});
