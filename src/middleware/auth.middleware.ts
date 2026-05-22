import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
// };
// import { Request, Response, NextFunction } from "express";

// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET as string;
// export const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "No token provided",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     (req as any).user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// // import { Request, Response, NextFunction } from "express";

// // export const auth = (req: Request, res: Response, next: NextFunction) => {
// //   const token = req.headers.authorization;
// //   if (token === "12345") {
// //     next();
// //   }else{
// //     res.status(401).json({message:"Unauthorized"})
// //   }
// // };
// // authorization ek special header hota hai jo mostly use hota hai:
// // login check karne ke liye
// // user verify karne ke liye
// // secure APIs ke liye
// }
