

import type { Request, Response } from "express";
import User from "../modals/user.ts";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phoneNumber, gender, address, city, country } = req.body;

 try{
    if (!firstName || !lastName || !email || !password || !phoneNumber || !gender || !address || !city || !country) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }
    if(password.length < 8){
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if(!email.includes("@") || !email.includes(".")){
      return res.status(400).json({ message: "Invalid email address" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName, 

      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      address,
      city,
      country,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



 