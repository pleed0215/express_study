import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "/Join" });

export const postJoin = (req, res) => {
  console.log(req.body); // bodyParser package 덕분임. 그래서 쉽게 post 된 내용을 확인 가능하다.
  if (req.body.password !== req.body.password2) {
    console.log("each password is not coincided.");
    res.status(400);
    res.render("join", { pageTitle: "/Join" });
  } else {
    // TODO: Register user as input, and log in.
    res.locals.user.isAuthenticated = true;
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "/login" });
export const postLogin = (req, res) => {
  res.locals.user.isAuthenticated = true;

  console.log(res.locals.user);
  res.redirect(routes.home);
};

// TODO: process to logout
export const logout = (req, res) => {
  res.locals.user.isAuthenticated = false;
  // res.render ("logout", {pageTitle: "/logout"});
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "/users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "/userDetail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "/editProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "/changePassword" });
