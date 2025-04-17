import { Request, Response } from "express";
import user from "../models/user.js";
import { ethers, getAddress } from "ethers";
import { getProvider, tokens } from "../utils/contractAddresses.js";
import { decrypt } from "../utils/encryption.js";
import { map } from "./user.js";

const usdtAbi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const pmap = new Map();

export const balance = async (req: Request, res: Response) => {
  const { public_id, token_name, network } = req.body;
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  const provider = getProvider(network);
  const address= getAddress(token_name);
  const usdt = new ethers.Contract(address || "", usdtAbi, provider);
  const balance = await usdt.balanceOf(public_id);
  const decimals = await usdt.decimals();

  const formatted = ethers.formatUnits(balance, decimals);
  console.log("usdt balance =", formatted);
  res.status(200).json({
    message: "Balance fetched successfully",
    balance: formatted,
  });
};

export const transaction = async (req: Request, res: Response) => {
  const { public_id, public_id1, to, amount, token_name, network } = req.body;
  if (!public_id || !to || !amount || !public_id1 || !token_name || !network) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  if (!pmap.has(public_id1)) {
    res.status(400).json({ message: "login again" });
    return;
  }
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  const address = getAddress(token_name);
  const provider = getProvider(network);
  if (
    credentials.private_key != null &&
    credentials.private_key.encrypted_key != null &&
    credentials.private_key.iv != null &&
    credentials.private_key.salt != null &&
    credentials.private_key.encrypted_key != null &&
    credentials.private_key.iv != null
  )
    try {
      pmap.set(
        public_id,
        await decrypt(map.get(public_id1), {
          encrypted_key: credentials.private_key.encrypted_key,
          iv: credentials.private_key.iv,
          salt: credentials.private_key.salt,
        })
      );
    } catch (error) {
      console.log("Error in decryption:", error);
      res.status(500).json({ message: "Login again" });
    }
  const wallet = new ethers.Wallet(pmap.get(public_id), provider);
  const usdt = new ethers.Contract(address, usdtAbi, wallet);
  pmap.delete(public_id);
  const decimals = await usdt.decimals();
  const formattedAmount = ethers.parseUnits(amount, decimals);
  const tx = await usdt.transfer(to, formattedAmount);
  const receipt = await tx.wait();
  res.status(200).json({ message: "Transaction successful" ,receipt: receipt});
};
