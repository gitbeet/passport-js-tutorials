require("./config/passport-setup");
const express = require("express");
const authRoutes = require("./routes/auth-rotes");
const profileRoutes = require("./routes/profile-routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expressSession = require("express-session");
const passport = require("passport");

dotenv.config();

// initialize express
const app = express();

// set up view engine as ejs
app.set("view engine", "ejs");

app.use(
  // middleware that creates a session cookie (session data is stored client-side)
  expressSession({
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: false, // GDPR compliance
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// sets up passport to work  with incoming requests
app.use(passport.initialize());
// restores authentication state from the session cookie
app.use(passport.session());

// connect to db
mongoose.connect(process.env.DATABASE_URI);

// auth routes middleware
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5000, () => console.log("Server running on port 5000"));
