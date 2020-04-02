import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());
// passport.serializeUser ((user, done) => done(null, user.id));
// We don't need to write serializeUser function thank to  passport-local-mongoose.
passport.serializeUser(User.serializeUser()); // which field will be saved in cookie.
// the reason User.serializeUser() instead of User.serializeUser is
// serializeUser() will generate serialUser function. So, need to use serializeUser(), not serializeUser.

// passport.deserializeUser ((id, done) => User.findById (id, (err,user) => done(err, user)));
passport.deserializeUser(User.deserializeUser()); // how to find user by cookie.