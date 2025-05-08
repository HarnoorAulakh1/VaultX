import axios from "axios";

const url=import.meta.env.VITE_PRODUCTION || "https://50.19.171.226/";

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const data = [
  {
    network: "Ethereum",
    token: "ETH",
    img: "./eth.webp",
  },
  {
    network: "BSC",
    token: "BNB",
    img: "./bsc.png",
  },
];

export const tokens = [
  {
    name: "Tether",
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  },
  {
    name: "Lido Staked Ether",
    symbol: "stETH",
    address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  },
  {
    name: "Pepe",
    symbol: "PEPE",
    address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933"
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
  },
  {
    name: "Maker",
    symbol: "MKR",
    address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
  }
];