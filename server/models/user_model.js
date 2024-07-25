const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email uniqueness
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isadmin: this.isadmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30y" } // Example: token expires in 30 years
    );
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating JWT token");
  }
};

// Define the model with the schema
const User = new mongoose.model("User", userSchema);

module.exports = User;
