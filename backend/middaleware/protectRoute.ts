



import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modals/user.ts";



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

    // Verify token

    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { userId: string };
  
    // Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Save user in request
  // Save user in request
(req as any).user = user;
    next();
  } catch (error : any) {
    console.log("Error in protectRoute:", error);

    res.status(500).json({
      message: error.message
    });
  }
};