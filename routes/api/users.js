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
        userid: objectId(), // generate a new ObjectId value
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
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user with given email exists
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      // Compare the entered password and the hashed password from the database
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err || !passwordMatch) {
          return res
            .status(400)
            .json({ message: "Invalid email or password" });
        }

        // Create a JWT token with user ID and email
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        // Return success response with token and user email
        res.status(200).json({
          message: "Login successful",
          email: user.email,
          token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error occurred", error: err });
    });
});

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


module.exports = router;