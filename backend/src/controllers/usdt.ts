import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { createToken } from "../utils/jwt.js";
import { userInterface } from "../types/user";
import { ethers } from "ethers";
import { provider, provider_eth } from "../index.js";
import { encrypt, decrypt, base64ToUint8Array } from "../utils/encryption.js";
import { map } from "./user.js";

const usdtAbi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";


const pmap = new Map();

export const balance = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  const usdt = new ethers.Contract(USDT_ADDRESS, usdtAbi, provider_eth);
  const balance = await usdt.balanceOf(public_id);
  const decimals = await usdt.decimals();

  const formatted = ethers.formatUnits(balance, decimals);
  console.log("usdt balance =", formatted);
  res.status(200).json({
    message: "Balance fetched successfully",
    balance: formatted,
  });
};

