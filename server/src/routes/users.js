const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/passport/keys');
const  auth = require ('../config/passport/auth')


// Load input validation
const validateRegisterInput = require('../config/passport/validation/resgister');
const validateLoginInput = require("../config/passport/validation/login");
// Load User model
const User = require("../app/models").users;


router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
     if (!isValid) {
       console.log(errors)
      return res.status(400).json(errors);
    } 
    const email = req.body.email;
  User.findOne({where:{ email: req.body.email }}).then(user => {
      if (user) {

        return res.status(400).json({ email: "Email já existe" });

      } else {

        const newUser = new User({
          nome: req.body.nome,
          email: req.body.email,
          password: req.body.password

        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;

    const password = req.body.password;
    // Find user by email
    
    User.findOne({where:{ email }}).then(user => {

      // Check if user exists
      if (!user) {
        return res.json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31622400 
            },

            (err, token) => {

            res.cookie('user-token', token)

              res.json({
                success: true,
                token: "Bearer " + token
              });

            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  User.findByPk(id).then( (user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      return res.json({ user: user });
    });
  }
);

  module.exports = router;