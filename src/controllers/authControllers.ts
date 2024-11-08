import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without name
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};
