import { JsonRpcProvider } from "ethers";

export const getProvider = (network1: string) => {
  const network = network1.toLowerCase();
  try {
    switch (network) {
      case "ethereum":
        return new JsonRpcProvider(process.env.ETHEREUM_MAIN);
      case "bsc":
        return new JsonRpcProvider(process.env.BSC_MAIN);
      case "bsc_test":
        return new JsonRpcProvider(process.env.BSC_TEST);
      default:
        return new JsonRpcProvider(process.env.INFURA_URL); // fallback or polygon
    }
  } catch (err) {
    console.error(`Error creating provider for ${network}:`, err);
    return null;
  }
};
