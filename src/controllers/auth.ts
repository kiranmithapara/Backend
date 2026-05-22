//old auth dile
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsers, saveUsers } from "../services/auth.service";
import { log } from "console";

const SECRET = process.env.JWT_SECRET as string;

// SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const users = await getUsers();

    // check user exists
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    await saveUsers(users);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Signup error" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const users = await getUsers();

    const user = users.find((u: any) => u.email === email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create token
    const token = jwt.sign({ email: user.email }, SECRET, {
      expiresIn: "1h",
    });
    console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login error" });
  }
};
