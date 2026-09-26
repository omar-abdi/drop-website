import type { Request, Response, NextFunction } from "express";

export const adminRoute = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    return next();
  } catch (error: any) {
    console.log("Admin route error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};