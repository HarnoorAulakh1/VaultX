import { Request, Response } from "express";
import user from "../models/user.js";
import { ethers, getAddress } from "ethers";
import { getProvider } from "../utils/contractAddresses.js";
import { decrypt } from "../utils/encryption.js";
import { map } from "./user.js";

const abi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const pmap = new Map();

export const balance = async (req: Request, res: Response) => {
  const { public_id, network, contractAddress } = req.body;
  console.log("Balance request:", req.body);
  if (!public_id || !network) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }

  try {
    const provider = getProvider(network);

    const isNative = !contractAddress || contractAddress == "" ? true : false;

    let formattedBalance: string;

    if (isNative) {
      const rawBalance = await provider?.getBalance(public_id);
      formattedBalance = ethers.formatEther(rawBalance || "0");
    } else {
      const tokenContract = new ethers.Contract(contractAddress, abi, provider);
      const rawBalance = await tokenContract.balanceOf(public_id);
      const decimals = await tokenContract.decimals();
      formattedBalance = ethers.formatUnits(rawBalance, decimals);
    }

    res.status(200).json({
      message: "Balance fetched successfully",
      balance: formattedBalance,
    });
  } catch (error) {
    console.error("Balance fetch error:", error);
    res.status(500).json({ message: "Error fetching balance" });
  }
};

export const transaction = async (req: Request, res: Response) => {
  const {
    public_id,
    public_id1,
    to,
    amount,
    token_name,
    network,
    contractAddress,
  } = req.body;
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
  try {
    const provider = getProvider(network);

    const isNative = !contractAddress || contractAddress === "native";

    if (isNative) {
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
      const tx = await wallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount),
      });
      const receipt = await tx.wait();
      console.log(receipt);
      pmap.delete(public_id);
      res
        .status(200)
        .json({ message: "Transaction successful", receipt: receipt });
    } else {
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
      const usdt = new ethers.Contract(contractAddress, abi, wallet);
      pmap.delete(public_id);
      const decimals = await usdt.decimals();
      const formattedAmount = ethers.parseUnits(amount, decimals);
      const tx = await usdt.transfer(to, formattedAmount);
      const receipt = await tx.wait();
      res
        .status(200)
        .json({ message: "Transaction successful", receipt: receipt });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ message: "Error processing transaction" });
  }
};
