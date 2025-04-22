const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout((e) => console.log("Error while logging out: ", e));
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    // which of the user data we want to use
    scope: ["profile"],
  })
);

// at this point we run the passport middleware to use the redirect code we get from google and fire the callback function from the passport-setup file
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
