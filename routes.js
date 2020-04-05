// Base routes.
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// USERS

const USERS = "/users";
const USER_DETAIL = "/:id"; // users/id
const EDIT_PROFILE = "/:id/edit-profile";
const CHANGE_PASSWORD = "/:id/change-password";

// VIDEOS

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// ERRORS
const ERR_UNAUTHORIZED = "/error/unauthorized";

// routes for passport.
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: (id) => (id ? `/users/${id}` : USER_DETAIL),
  editProfile: (id) => (id ? `/users/${id}/edit-profile` : EDIT_PROFILE),
  changePassword: (id) =>
    id ? `/users/${id}/change-password` : CHANGE_PASSWORD,

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => (id ? `/videos/${id}` : VIDEO_DETAIL),
  editVideo: (id) => (id ? `/videos/${id}/edit` : EDIT_VIDEO),
  deleteVideo: (id) => (id ? `/videos/${id}/delete` : DELETE_VIDEO),

  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  errUnauthorized: ERR_UNAUTHORIZED,
};

export default routes;
