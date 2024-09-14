const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("Authorization header missing or incorrect format");
      return res.status(403).json({ msg: 'Invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Decoded token:", decoded);

      if (!decoded.userid) {
          console.log("Token payload missing userid");
          return res.status(403).json({ msg: 'Invalid token payload, userid missing' });
      }

      req.userid = decoded.userid;
      next();
  } catch (err) {
    console.log("Error during token verification:", err.message);
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = {
  authmiddleware,
}

