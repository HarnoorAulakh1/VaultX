export const chainId = {
  ethereum: 1,
  goerli: 5,
  sepolia: 11155111,
  bsc: 56,
  bscTestnet: 97,
  polygon: 137,
  mumbai: 80001,
  arbitrum: 42161,
  arbitrumGoerli: 421613,
  optimism: 10,
  optimismGoerli: 420,
  avalanche: 43114,
  avalancheFuji: 43113,
  fantom: 250,
  fantomTestnet: 4002,
  base: 8453,
  baseGoerli: 84531,
  gnosis: 100,
  polygonZkEVM: 1101,
  polygonZkEVMTestnet: 1442,
};

export const tokens = {
  1: [
    {
      symbol: "ETH",
      name: "Ethereum",
      contractAddress: null,
      decimals: 18,
      isNative: true,
      img:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      coingeckoId: "ethereum",
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      img: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
      coingeckoId: "tether",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
      img:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
      coingeckoId: "usd-coin",
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      img: "https://assets.coingecko.com/coins/images/9956/large/4943.png",
      coingeckoId: "dai",
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      decimals: 18,
      img:
        "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
      coingeckoId: "uniswap",
    },
    {
      symbol: "LINK",
      name: "ChainLink",
      contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
      img:
        "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
      coingeckoId: "chainlink",
    },
  ],
  56: [
    {
      symbol: "BNB",
      name: "BNB",
      contractAddress: null,
      decimals: 18,
      isNative: true,
      img:
        "https://assets.coingecko.com/coins/images/12591/large/binance-coin-logo.png",
      coingeckoId: "binancecoin",
    },
    {
      symbol: "BUSD",
      name: "Binance USD",
      contractAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      decimals: 18,
      img: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png",
      coingeckoId: "binance-usd",
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      contractAddress: "0x55d398326f99059ff775485246999027b3197955",
      decimals: 18,
      img: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
      coingeckoId: "tether",
    },
    {
      symbol: "CAKE",
      name: "PancakeSwap",
      contractAddress: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
      decimals: 18,
      img:
        "https://assets.coingecko.com/coins/images/12632/large/IMG_0440.PNG",
      coingeckoId: "pancakeswap-token",
    },
    {
      symbol: "WBNB",
      name: "Wrapped BNB",
      contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      img:
        "https://assets.coingecko.com/coins/images/12591/large/binance-coin-logo.png",
      coingeckoId: "wbnb",
    },
    {
      symbol: "ETH",
      name: "Binance-Peg Ethereum",
      contractAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      decimals: 18,
      img:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      coingeckoId: "ethereum",
    },
  ],
};
