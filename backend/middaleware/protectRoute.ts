



import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modals/user.ts";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key12cccdjknkldmlncm9wnnnwnwwwiwwiwiwiwiwiii";


export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token as string;

    // Check token





    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, no token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    console.log("Error in protectRoute:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};