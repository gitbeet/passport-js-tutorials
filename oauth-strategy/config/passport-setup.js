const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../models/user-mode");
dotenv.config();

//
// the user that is getting passed here is the user from the callback function (either the existingUser or the newUser)
passport.serializeUser((user, done) => {
  // id from our database (we still use id and not _id which was the field in the database)
  // null is for the error argument
  done(null, user.id);
});

// the id that is getting passed here is the id property that is getting extracted from the cookie
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // strategy options
      clientID: process.env.GOOGLE_PLUS_API_CLIENT_ID,
      clientSecret: process.env.GOOGLE_PLUS_API_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    // callback function , executed after getting the redirect code
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists in the database
        const existingUser = await User.findOne({ googleId: profile.id });
        //   if user does not exist create one
        if (!existingUser) {
          const newUser = await new User({
            username: profile.displayName,
            googleId: profile.id,
          }).save();
          // were passing null for the error argument for now
          done(null, newUser);
        }
        // were passing null for the error argument for now
        done(null, existingUser);
      } catch (error) {
        console.log("Passport callback function error: ", error);
      }
    }
  )
);
