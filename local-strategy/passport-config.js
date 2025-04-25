import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

export const initializePassport = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (!user) return done(null, false, { message: "User not found" });
    try {
      const result = await bcrypt.compare(password, user.password);
      if (!result) return done(null, false, { message: "Wrong password" });
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};
