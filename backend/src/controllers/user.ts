import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { createToken } from "../utils/jwt.js";
import { userInterface } from "../types/user";
import { ethers } from "ethers";
import { provider } from "../index.js";

export const login = async (req: Request, res: Response) => {
  const { public_id, password } = req.body;
  if (!public_id || !password) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  console.log(public_id, password);
  const data: userInterface[] = await user.find({ public_id: public_id });
  console.log(data[0]);
  const user1 = data[0];
  if (data.length === 0) {
    res.status(401).json({ message: "Public address is incorrect" });
    return;
  } else {
    if (!(await bcrypt.compare(password, user1.password))) {
      console.log("wrong");
      res.status(401).json({ message: "Password is incorrect" });
      return;
    }
  }
  res
    .status(200)
    .cookie("token", createToken({ ...user1, private_Key: "" }), {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60),
    })
    .send(user1);
};

export const lock = async (req: Request, res: Response) => {
  res.clearCookie("token").send("Logged out");
};

export const register = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const wallet = ethers.Wallet.createRandom();
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedKey = await bcrypt.hash(wallet.privateKey, 10);
    console.log(wallet.privateKey);
    console.log(wallet.address);
    const newUser = new user({
      password: hashedPassword,
      public_id: wallet.address,
      private_Key: hashedKey,
    });

    await newUser.save();
    res.status(200).json({
      message: "New wallet created successfully",
      public_id: wallet.address,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.headers["authorization"]
      ? JSON.parse(req.headers["authorization"])["value"]
      : null);
  const secret: any = process.env.secret;
  try {
    if (!token) {
      res.status(401).json({ message: "No token" });
    } else {
      const data: any = jwt.verify(token, secret);
      res.status(200).json(data["_doc"]);
    }
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const checkAddress = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  if (!public_id) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  if (!ethers.isAddress(public_id)) {
    res.status(400).json({ message: "Invalid address" });
    return;
  }
  const balance = await provider.getBalance(public_id);
  res.status(200).json({
    message: "account is valid",
    balance: ethers.formatEther(balance),
  });
};

export const setupExistingWallet = async (req: Request, res: Response) => {
  const { password, private_key, seed_phrase } = req.body;
  console.log(password, private_key, seed_phrase);
  if (!password || !(private_key || seed_phrase)) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  let wallet, hashedKey, hashedPassword;
  if (seed_phrase) {
    wallet = ethers.Wallet.fromPhrase(seed_phrase);
    hashedKey = await bcrypt.hash(wallet.privateKey, 10);
    hashedPassword = await bcrypt.hash(wallet.address, 10);
  } else {
    hashedKey = await bcrypt.hash(private_key, 10);
    hashedPassword = await bcrypt.hash(password, 10);
    wallet = new ethers.Wallet(private_key);
  }

  try {
    console.log(seed_phrase);
    console.log(wallet.address);
    const address = wallet.address;
    const newUser = new user({
      password: hashedPassword,
      public_id: address,
      private_Key: hashedKey,
    });

    await newUser.save();
    res.status(200).json({
      message: "Wallet retrieved successfully",
      public_id: address,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
