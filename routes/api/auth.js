const jwt = require('jsonwebtoken');
const Users = require('../../db/UserModel');

function authenticateUser(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;
  console.log(token);

  // Verify the token and get the user ID
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database and attach it to the request object
    Users.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized access2' });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        res.status(500).json({ message: 'Error occurred', error: err });
      });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized access1' });
  }
}

module.exports = authenticateUser;