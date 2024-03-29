const jwt = require('jsonwebtoken');
const Users = require('../../db/UserModel');

function authenticateUser(req, res, next) {
  // Get the token from the request headers
  const token = req.header('x-auth-token') || req.body.token || req.query.token;

  if (!token) return res.status(401).json({ msg: 'No token was provided to the server: Could not authorize' });

  // Verify the token and get the user ID

  try {
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN" || process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database and attach it to the request object
    Users.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'User information invalid' });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        res.status(500).json({ message: 'Error occurred', error: err });
      });
  } catch (err) {
    res.status(401).json({ message: 'You were signed out' });
  }
}

module.exports = authenticateUser;