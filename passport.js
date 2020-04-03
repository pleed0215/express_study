import passport from "passport";
import GithubPassport from "passport-github";
import FacebookPassport from "passport-facebook";

import User from "./models/User";

const GithubStrategy = GithubPassport.Strategy;
const FacebookStrategy = FacebookPassport.Strategy;

const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubCallbackURL = process.env.GITHUB_CALLBACK_URL;

const facebookClientID = process.env.FB_CLIENT_ID;
const facebookClientSecret = process.env.FB_CLIENT_SECRET;
const facebookCallbackURL = process.env.FB_CALLBACK_URL;

// passport strategies.

// for local login strategy.
passport.use(User.createStrategy());

// for github login strategy.
passport.use(
  new GithubStrategy(
    {
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackURL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      // codes here, after github send user information.
      const {
        _json: { id, avatar_url: avatarUrl, email, name },
      } = profile;

      try {
        const user = await User.findOne({ githubId: id });
        if (user) {
          user.githubId = id;
          user.avatarUrl = avatarUrl;
          user.name = name;
          user.email = email;
          user.save();
          console.log(user);
          return cb(null, user);
        } else {
          const newUser = await User.create({
            name,
            email,
            avatarUrl: avatarUrl,
            githubId: id,
          });
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

// for facebook passport login strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientID,
      clientSecret: facebookClientSecret,
      callbackURL: facebookCallbackURL,
      profileFields: ["id", "displayName", "picture", "emails"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      // codes here, after github send user information.
      const {
        _json: { id, email, name },
      } = profile;
      const intId = parseInt(id);
      const avatarUrl = `https://graph.facebook.com/${intId}/picture?type=large`;

      try {
        const user = await User.findOne({ facebookId: intId });
        if (user) {
          user.facebookId = intId;
          user.avatarUrl = avatarUrl;
          user.name = name;
          user.email = email;
          user.save();
          console.log(user);
          return cb(null, user);
        } else {
          const newUser = await User.create({
            name: name,
            email: email,
            avatarUrl: avatarUrl,
            facebookId: intId,
          });
          console.log(avatarUrl, intId, name, email);
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
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
