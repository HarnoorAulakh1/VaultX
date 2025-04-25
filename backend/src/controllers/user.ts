import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { createToken } from "../utils/jwt.js";
import { userInterface } from "../types/user";
import { ethers } from "ethers";
import {
  encrypt,
  decrypt,
  base64ToUint8Array,
  decodeInput,
} from "../utils/encryption.js";
import { getProvider } from "../utils/contractAddresses.js";
import axios from "axios";
import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.BNB_MAINNET,
};
const alchemy = new Alchemy(config);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const abi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const map = new Map();
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
    let { public_id, password, network } = req.body;
    console.log(public_id, password, network);
    console.log(map);
    if (public_id && map.has(public_id)) {
      password = map.get(public_id);
    } else if (!password) {
      res.status(400).json({ message: "Field is missing" });
      return;
    }
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
      network,
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
      network: network,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const privateKey = async (req: Request, res: Response) => {
  const { public_id, public_id1 } = req.body;
  if (!public_id) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  if (!map.has(public_id1)) {
    res.status(400).json({ message: "Login again" });
    return;
  }
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
  setTimeout(() => {
    pmap.delete(public_id);
  }, 5000);
  res.status(200).json({ privateKey: pmap.get(public_id) });
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
  const { public_id, network } = req.body;
  if (!public_id) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  if (!ethers.isAddress(public_id)) {
    res.status(400).json({ message: "Invalid address" });
    return;
  }
  try {
    const provider1 = getProvider(network);
    if (!provider1) {
      res.status(400).json({ message: "Invalid network" });
      return;
    }
    const balance = await provider1.getBalance(public_id);
    if (balance == null) {
      res.status(400).json({ message: "Invalid address" });
      return;
    }
    res.status(200).json({
      message: "account is valid",
      balance: ethers.formatEther(balance),
    });
  } catch (error) {
    console.error("Error in checkAddress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const setupExistingWallet = async (req: Request, res: Response) => {
  const { password, private_key, seed_phrase, network } = req.body;
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
      network,
      private_key: {
        encrypted_key: encrypted.encrypted_key,
        iv: encrypted.iv,
        salt: encrypted.salt,
      },
    });

    await newUser.save();
    res.status(200).json({
      message: "Wallet retrieved successfully",
      network: network,
      public_id: address,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const transaction = async (req: Request, res: Response) => {
//   const { public_id, public_id1, to, amount, network } = req.body;
//   //console.log(map);
//   //console.log(req.body)
//   if (!public_id || !to || !amount || !public_id1 || !network) {
//     res.status(400).json({ message: "Field is missing" });
//     return;
//   }
//   if (!map.has(public_id1)) {
//     res.status(400).json({ message: "login again" });
//     return;
//   }
//   let provider1 = getProvider(network);
//   const credentials = await user.findOne({ public_id: public_id });
//   if (!credentials) {
//     res.status(400).json({ message: "Private Key not available" });
//     return;
//   }
//   //console.log(credentials);
//   if (
//     credentials.private_key != null &&
//     credentials.private_key.encrypted_key != null &&
//     credentials.private_key.iv != null &&
//     credentials.private_key.salt != null &&
//     credentials.private_key.encrypted_key != null &&
//     credentials.private_key.iv != null
//   )
//     try {
//       pmap.set(
//         public_id,
//         await decrypt(map.get(public_id1), {
//           encrypted_key: credentials.private_key.encrypted_key,
//           iv: credentials.private_key.iv,
//           salt: credentials.private_key.salt,
//         })
//       );
//     } catch (error) {
//       console.log("Error in decryption:", error);
//       res.status(500).json({ message: "Login again" });
//     }
//   const wallet = new ethers.Wallet(pmap.get(public_id), provider1);
//   const tx = await wallet.sendTransaction({
//     to: to,
//     value: ethers.parseEther(amount),
//   });
//   const receipt = await tx.wait();
//   console.log(receipt);
//   pmap.delete(public_id);
//   res.status(200).json({ message: "Transaction successful", receipt: receipt });
// };

export const getPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  //console.log(id);
  if (!id) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  try {
    // const response = await axios.get(
    //   `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    // );
    // const price = response.data[id].usd;
    // res.status(200).json({ price: price });
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    try {
      const apiKey=process.env.ALCHEMY_KEY
      const response = await axios(
        `https://api.g.alchemy.com/prices/v1/${apiKey}/tokens/by-symbol?symbols=${id}`,
        options
      );
      console.log(response.data.data[0]);
      const price = response.data.data[0].prices[0].value;
      res.status(200).json({ price: price });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching price" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching price" });
    return;
  }
};

export const transaction = async (req: Request, res: Response) => {
  const { public_id, public_id1, to, amount, network, contractAddress } =
    req.body;
  if (!public_id || !to || !amount || !public_id1 || !network) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }
  console.log("hello1", map);
  if (!map.has(public_id1)) {
    res.status(400).json({ message: "login again" });
    return;
  }
  console.log("hello2");
  const credentials = await user.findOne({ public_id: public_id });
  if (!credentials) {
    res.status(400).json({ message: "Private Key not available" });
    return;
  }
  console.log(req.body);
  try {
    const provider = getProvider(network);

    const isNative = !contractAddress || contractAddress == "" ? true : false;

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

export const balance = async (req: Request, res: Response) => {
  const { public_id, network, contractAddress } = req.body;
  // console.log("Balance request:", req.body);
  if (!public_id || !network) {
    res.status(400).json({ message: "Field is missing" });
    return;
  }

  try {
    const provider = getProvider(network);

    const isNative =
      !contractAddress || contractAddress.length == 0 ? true : false;
    //console.log("isNative", isNative, contractAddress);

    let formattedBalance: string;

    if (isNative) {
      const balance = await provider?.getBalance(public_id);
      formattedBalance = ethers.formatEther(balance || "0");
      res.status(200).json({
        message: "Balance fetched successfully",
        balance: formattedBalance,
      });
    } else {
      await delay(5000);
      const tokenContract = new ethers.Contract(contractAddress, abi, provider);
      const rawBalance = await tokenContract.balanceOf(public_id);
      const decimals = await tokenContract.decimals();
      const balance = ethers.formatUnits(rawBalance, decimals);
      res.status(200).json({
        message: "Balance fetched successfully",
        balance: balance,
      });
    }
  } catch (error) {
    //console.error("Balance fetch error:", error);
    res.status(500).json({ message: "Error fetching balance" });
  }
};

export const transactions = async (req: Request, res: Response) => {
  const { public_id, chainId } = req.query;
  console.log("Transactions request:", req.query);
  try {
    const response = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${public_id}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
    );
    const data = response.data.result;
    //console.log(data);
    const transactions = data.map((tx: any) => {
      if (tx.methodId == "0xa9059cbb") {
        const data = decodeInput(tx.input);
        return {
          hash: tx.hash,
          from: tx.from,
          to: data.to,
          amount: ethers.formatUnits(data.value, 18),
          date: new Date(tx.timeStamp * 1000).toLocaleString(),
          status: tx.isError == "0" ? "Success" : "Failed",
        };
      }
      else if(tx.methodId == "0x"){
      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        amount: ethers.formatUnits(tx.value, 18),
        date: new Date(tx.timeStamp * 1000).toLocaleString(),
        status: tx.isError == "0" ? "Success" : "Failed",
      };
    }
    });
    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
