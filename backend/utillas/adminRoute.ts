import type { Request, Response } from 'express';

export const adminRoute = async (req:any, res: Response) => {
  try {
    // Hubi in user jiro oo uu admin yahay (isticmaal optional chaining ?.)
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Halkan geli shaqadaada ama logic-gaaga admin-ka
    return res.status(200).json({ message: "Welcome to the admin dashboard!" });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};