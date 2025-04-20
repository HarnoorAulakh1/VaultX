import { createContext } from "react";
import { tokenInterface } from "../lib/types";

export const tokenContext = createContext<{
  token: tokenInterface;
  setToken: React.Dispatch<React.SetStateAction<tokenInterface>>;
}>({
  token: {
    chainId: "",
    contractAddress: "",
    name: "",
    symbol: "",
    decimals: 0,
    img: "",
    coingeckoId: "",
    isNative: false,
  },
  setToken: () => {},
});