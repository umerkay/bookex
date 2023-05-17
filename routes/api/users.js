const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../db/UserModel');
const authenticateUser = require('./auth');

//routes
//resgister endpoint
router.post('/register', (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new Users({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
        phonenumber: request.body.phonenumber,
        city: request.body.city,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: error.keyValue.email ? "Email already exists" : "Phone number already exists",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "There was an error creating this user :(",
        e,
      });
    });
});

router.post('/user', authenticateUser, (request, response) => {
  response.status(200).send({
    message: "Login Successful",
    user: request.user
  });
});

// login endpoint
router.post("/login", async (request, response) => {
  // check if email exists
  Users.findOne({ email: request.body.email }).select("password")

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then(async (passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          //   return success response
          response.status(200).send({
            message: "Login Successful",
            user: await Users.findById(user._id),
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
}
);

// POST /api/user/logout
// AUTH: log out a user and invalidate their token
router.post("/logout", authenticateUser, (req, res) => {
  // destroy the user's token and log them out
  const user = req.user;
  user.token = null;
  user.save()
    .then(() => {
      res.status(200).json({ message: "Logout successful" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error occurred", error: error });
    });
});

//get user id from the jwt token
// GET /api/user/: (AUTH) get user profile details
// router.get("/details", authenticateUser, (req, res) => {
//   const user = req.user;
//   res.status(200).json({
//     message: "User profile details",
//     user: {
//       name: user.name,
//       email: user.email,
//       phonenumber: user.phonenumber,
//       city: user.city,
//     },
//   });
// });

//POST /api/user/update: (AUTH) update user profile details
router.post("/update", authenticateUser, (req, res) => {
  const user = req.user;
  user.name = req.body.name;
  user.email = req.body.email;
  user.phonenumber = req.body.phonenumber;
  user.city = req.body.city;
  user.save()
    .then(() => {
      res.status(200).json({ message: "User profile updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error occurred", error: error });
    });
});

module.exports = router;