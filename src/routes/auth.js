const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleID: profile.id });

        if (user) {
          cb(null, user);
        } else {
          user = await User.create(newUser);
          cb(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error logging out");
    } else {
      res.redirect("/");
    }
  });
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = router;
