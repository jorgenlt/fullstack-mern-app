import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register new user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generation a salt for password hashing    
    const salt = await bcrypt.genSalt();
    // Hashing the password with generated salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Creating a new User instance with the provided and generated details
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Saving the newly created user to the database
    const savedUser = await newUser.save();

    // Sending a response with the saved user's details
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    // Get the login credentials
    const { email, password } = req.body;

    // Finding a user by email in the db
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Comparing provided password with hashed password in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong email or password." });
    }

    // Generation a json web token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the user password before sending a response
    delete user.password;

    // Sending a response with the generated token and user's details
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
