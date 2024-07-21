const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  const token = authHeader.split(" ")[1]; // Splitting 'Bearer <token>'
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
