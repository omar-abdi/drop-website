import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.ts";

dotenv.config();    
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(3000, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
