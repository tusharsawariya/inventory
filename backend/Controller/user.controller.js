import { validationResult } from "express-validator";
import User from "../Model/user.model.js";
import dotenv from "dotenv";


// Load environment variables
dotenv.config();
// app.use(cookieParser());
export const signIn = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email }, raw: true });
          const token=await user.generateToken()
          
        // Check if user exists
        if (user) {
            // Check password
            const isPasswordValid = await User.checkPassword(password, user.password);
            if (isPasswordValid) {
                return response.status(200).json({ message: 'Sign in success', user,token });
            }
            return response.status(401).json({ error: "Invalid password" });
        }
        return response.status(401).json({ error: "Invalid email" });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const signUp = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = request.body;

    try {
        // Create new user
        const user = await User.create({ username, email, password });
        
        // Generate token
        const token = await user.generateToken();
        
        return response.status(201).json({ message: 'User created', user, token });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};