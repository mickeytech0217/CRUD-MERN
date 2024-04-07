const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../Validation/register");
const validateLoginInput = require("../../Validation/Login");
//user model
const User = require("../../Model/User");


// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name: req.body.name }).then((user) => {
    if (user) {
      errors.name = "Username Already Exits";
      return res.status(400).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        } else {
        //   const avatar = gravatar.url(req.body.email, {
        //     s: "200", // Size
        //     r: "pg", // Rating
        //     d: "mm", // Default
        //   });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post(
  "/login",

  (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user._id,
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(payload, keys.secretOrKey, {}, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

module.exports = router;
