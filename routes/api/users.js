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


// router.get('/:id', (req, response) => {
//   Users.findById(req.params.id)
//     .then((user) => {
//       response.status(200).send({
//         id: user._id,
//         ...user._doc
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: "Error retrieving user",
//         error,
//       });
//     });
// });



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

// get user id from the jwt token
// GET /api/user/: (AUTH) get user profile details
router.get("/details", authenticateUser, (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "User profile details",
    user: {
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      city: user.city,
    },
  });
});

//POST /api/user/update: (AUTH) update user profile details
router.put("/update", authenticateUser, (req, res) => {
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




//get all users on get /
//User Routes for Admin Panel
router.get('/', (req, response) => {
  Users.find()
    .then((users) => {
      response.status(200).send(users.map((user) => {
        return {
          id: user._id,
          ...user._doc
        };  
      }));
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error retrieving users",
        error,
      });
    });
});

//GET API to retrieve User Details
router.get('/:id', (req, response) => {
  Users.findById(req.params.id)
    .then((user) => {
      response.status(200).send({
        id: user._id,
        ...user._doc
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error retrieving user",
        error,
      });
    });
});


//PUT API to update user on admin panel
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phonenumber, city } = req.body;
  const user = await Users.findByIdAndUpdate(id, { name, email, phonenumber, city }, { new: true });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user
    });
    });

//DELETE api for deleting transaction
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await Users.findByIdAndRemove(id);
  
      if (user) {
        res.status(200).json({
          success: true,
          message: "User deleted successfully"
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message
      });
    }
  });

  //POST api for creating a user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phonenumber, city} = req.body;

    // Validate the request body
    if (!name || !email || !password || !phonenumber || !city) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, password, phonenumber and city. "
      });
    }

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Create the new user
    const newUser = await Users.create({
      name,
      email,
      password,
      phonenumber,
      city
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
});
  
module.exports = router;