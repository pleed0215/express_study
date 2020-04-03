import passport from "passport";
import GithubPassport from "passport-github";

import User from "./models/User";

const GithubStrategy = GithubPassport.Strategy;
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;

// passport strategies.

// for local login strategy.
passport.use(User.createStrategy());

// for github login strategy.
passport.use(
  new GithubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL
    },
    (accessToken, refreshToken, profile, cb) => {
      // codes here, after github send user information.
      User.findOne({ githubId });
    }
  )
);

// passport.serializeUser ((user, done) => done(null, user.id));
// We don't need to write serializeUser function thank to  passport-local-mongoose.
passport.serializeUser(User.serializeUser()); // which field will be saved in cookie.
// the reason User.serializeUser() instead of User.serializeUser is
// serializeUser() will generate serialUser function. So, need to use serializeUser(), not serializeUser.

// passport.deserializeUser ((id, done) => User.findById (id, (err,user) => done(err, user)));
passport.deserializeUser(User.deserializeUser()); // how to find user by cookie.
