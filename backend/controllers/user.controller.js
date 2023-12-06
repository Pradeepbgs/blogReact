import { User } from "../models/user.model.js";

async function handleSubmitRegister(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({ error: "User not created" });
    }

    // Hash and salt the password before storing in the database
    // ... (use bcrypt or another hashing library)

    // Send a response to the client
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error("Error in user.controllers.js: while registering", error);
    // Pass the error to the error-handling middleware
    next(error);
  }
}

async function handleSubmitLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Optionally, generate a JWT token for authentication
    // ... (use a library like jsonwebtoken)

    res.status(200).json({ user, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error in user.controllers.js while trying to login : ", error);
    // Pass the error to the error-handling middleware
    next(error);
  }
}

export { handleSubmitLogin, handleSubmitRegister };
