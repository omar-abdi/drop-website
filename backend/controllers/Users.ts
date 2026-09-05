

import type { Request, Response } from "express";
import User from "../modals/user.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key12cccdjknkldmlncm9wnnnwnwwwiwwiwiwiwiwiii";

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
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
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

// get all users 

export const getAllUsers = async(req :any , res : Response)=>{
  try{
    if(req.user && req.user.isAdmin){
      const users = await User.find();
      res.status(200).json(users);
    } else {
      res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//delete uer by id

export const deleteUserById = async(req :any , res : Response)=>{
  try{
    if(req.user && req.user.isAdmin){
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } else {  
      res.status(403).json({ message: "Acce ss denied. Admin privileges required." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}
  

// update user by id
export const updateUserById = async(req :any , res : Response)=>{
  try{
    if(req.user && req.user.isAdmin){
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(user);
    } else {  
      res.status(403).json({ message: "Acce ss denied. Admin privileges required." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

