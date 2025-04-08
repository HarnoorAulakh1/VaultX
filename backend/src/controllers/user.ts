import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { createToken } from "../utils/jwt.js";
import { userInterface } from "../types/user";
import { ethers } from "ethers";
import { provider } from "../index.js";
import { encrypt, decrypt, base64ToUint8Array } from "../utils/encryption.js";

const map = new Map();
const pmap = new Map();

export const login = async (req: Request, res: Response) => {
  const { public_id, password } = req.body;
  if (!public_id || !password) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  const data: userInterface[] = await user.find({ public_id: public_id });
  const user1 = data[0];
  if (data.length === 0) {
    res.status(401).json({ message: "Public address is incorrect" });
    return;
  } else {
    if (!(await bcrypt.compare(password, user1.password))) {
      //console.log(user1.password);
      res.status(401).json({ message: "Password is incorrect" });
      return;
    }
  }
  map.set(public_id, password);
  setTimeout(() => {
    map.delete(public_id);
  }, 60 * 61 * 1000);
  res
    .status(200)
    .cookie("token", createToken({ ...user1, private_key: {} }), {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60),
    })
    .send({ ...user1, private_key: "" });
};

export const lock = async (req: Request, res: Response) => {
  map.delete(req.body.public_id);
  res.clearCookie("token").send("Logged out");
};

export const register = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const wallet = ethers.Wallet.createRandom();
    const seed_phrase = wallet.mnemonic?.phrase;
    //console.log(password, wallet.privateKey, wallet.address);
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedKey = await bcrypt.hash(wallet.privateKey, 10);
    const encrypted = await encrypt(password, wallet.privateKey);
    //console.log(encrypted);
    const newUser = new user({
      password: hashedPassword,
      public_id: wallet.address,
      private_key: {
        encrypted_key: encrypted.encrypted_key,
        iv: encrypted.iv,
        salt: encrypted.salt,
      },
    });

    await newUser.save();
    res.status(200).json({
      message: "New wallet created successfully",
      public_id: wallet.address,
      private_key: wallet.privateKey,
      seed_phrase: seed_phrase,
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
  console.log(password.length);
  console.log(password == "demo7890");
  if (!password || !(private_key || seed_phrase)) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  let wallet, hashedKey, hashedPassword;
  if (seed_phrase) {
    wallet = ethers.Wallet.fromPhrase(seed_phrase);
    hashedKey = await bcrypt.hash(wallet.privateKey, 10);
    hashedPassword = await bcrypt.hash(password, 10);
  } else {
    hashedKey = await bcrypt.hash(private_key, 10);
    hashedPassword = await bcrypt.hash(password, 10);
    wallet = new ethers.Wallet(private_key);
  }

  try {
    console.log(seed_phrase);
    console.log(wallet.address);
    const address = wallet.address;
    const encrypted = await encrypt(password, wallet.privateKey);
    const newUser = new user({
      password: hashedPassword,
      public_id: wallet.address,
      private_key: {
        encrypted_key: encrypted.encrypted_key,
        iv: encrypted.iv,
        salt: encrypted.salt,
      },
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

export const transaction = async (req: Request, res: Response) => {
  const { public_id, to, amount } = req.body;
  console.log(map);
  if (!public_id || !to || !amount) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  // if (!map.has(public_id)) {
  //   res.status(400).json({ message: "login again" });
  //   return;
  // }
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  console.log(credentials);
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
        await decrypt("hello123", {
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
  pmap.delete(public_id);
  res.status(200).json({ message: "Transaction successful" });
};
