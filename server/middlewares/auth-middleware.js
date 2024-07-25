const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const authMiddleware = async (req, res, next) => {
  const Token = req.header("Authorization");

  if (!Token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }

  const jwtToken = Token.replace("Bearer","").trim();
  console.log("Token from auth middleware:", jwtToken);

  const JWT_SECRET_KEY = "WORLDBESTMERNSERIES"; // Replace with your actual secret key

  try {
    const isVerified = jwt.verify(jwtToken, JWT_SECRET_KEY);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
    console.log("User data:", userData);
    

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // Attach user data and token details to the request object
    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
