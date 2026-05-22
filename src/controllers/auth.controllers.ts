import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { log } from "console";

//Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const existeingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existeingUser) {
      return res.status(400).json({
        success: false,
        message: "Email alredy exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const usre = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!usre) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      usre.getDataValue("password"),
    );
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: usre.getDataValue("id"),
        role: usre.getDataValue("role"),
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );
    console.log(token);

    res.status(200).json({
      success: true,

      message: "Login successful",

      token,
    });
  } catch (error) {
    next(error);
  }
};
