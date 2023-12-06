import { User } from "../models/user.model.js";
async function handleSubmitRegister(req, res, next) {
    try {
      const { name, email, password } = req.body;

        if([name, email, password].some((field) => field?.trim() === "")){
            res.status(400).json({error: "All fields are required"});
        }

        const existedUser = await User.find({
            email,
        })

        if(existedUser){
           return res.status(400).json({error: "user already exists"});
        }

      const user = await User.create({
        name,
        email,
        password,
      });
      // Send a response to the client
      res.status(201).json({ user, message: 'User created successfully' });
    } catch (error) {
      console.error("Error in user.controllers.js:", error);
      // Pass the error to the error-handling middleware
      next(error);
    }
  }

  async function handleSubmitLogin(req, res, next) {
    try {
        
    } catch (error) {
        console.error("Error in user.controllers.js while trying to login : ", error);
    }
  }
  
  export default handleSubmitRegister;
  