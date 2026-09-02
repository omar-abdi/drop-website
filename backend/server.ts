import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.ts";
import userRoute from "./Routes/userRoute.ts";

dotenv.config();    
const app = express();
app.use(express.json());
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(3000, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
