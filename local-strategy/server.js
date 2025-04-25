import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
import { initializePassport } from "./passport-config.js";
import methodOverride from "method-override";

const users = [];

dotenv.config();
initializePassport(
  passport,
  // getUserByEmail
  (email) => users.find((user) => user.email === email),
  // getUserById
  (id) => users.find((user) => user.id === id)
);

const app = express();
app.use(express.json());
app.set("view-engine", "ejs");
app.use(express.static("public"));
// for the forms
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/sign-in", checkNotAuthenticated, (req, res) =>
  res.render("sign-in.ejs")
);
app.get("/sign-up", checkNotAuthenticated, (req, res) =>
  res.render("sign-up.ejs")
);

app.post(
  "/sign-in",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureFlash: true,
  })
);
app.post("/sign-up", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/sign-in");
  } catch (error) {
    res.redirect("/sign-up");
  }
  console.log(users);
});

app.delete("/sign-out", (req, res) => {
  req.logOut(() => res.redirect("/sign-in"));
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/sign-in");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(5000, () => console.log("Server running on 5000"));
