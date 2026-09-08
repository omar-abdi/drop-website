import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.ts";
import userRoute from "./Routes/userRoute.ts";
import productRoute from "./Routes/products.ts";
import cookieParser from "cookie-parser";
// kinds router
import kindsRouter from "./Routes/kinds.ts"
import cors from "cors";
import dns from 'dns';

// DNS Fix MongoDB Atlas SRV Error
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();    
   
const app = express();
app.use(cookieParser());
app.use(express.json());
  app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
  }));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("api/kinds" , kindsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
