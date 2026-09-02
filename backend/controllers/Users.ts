

import type { Request, Response } from "express";
import User from "../modals/user.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phoneNumber, gender, address , isAdmin } = req.body;
 

 try{
    if (!firstName || !lastName || !email || !password || !phoneNumber || !gender || !address ) {
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
  
      isAdmin
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    //access_token
    res.cookie("access_token", token, {
         httpOnly: true,
        
         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds

     });
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};  



//logout user




 

export const logoutUser = async(req :Request , res : Response)=>{


  try{
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  }catch(error){

    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  } 

}