import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./routes/user.js";
import { ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();
const app = express();
export const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://localhost:5174",
      "http://localhost:5173",
      "https://hoppscotch.io",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/user", user);

app.get("/", function (_req, res) {
  res.send({ message: "Hello World" });
});

export { app };
