import { useState } from "react";
import { tokenInterface } from "../lib/types";
import { tokenContext } from "../contexts/tokenContext";

export default function Token({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<tokenInterface>({
    chainId: "",
    contractAddress: "",
    name: "",
    symbol: "",
    decimals: 0,
    img: "",
    coingeckoId: "",
    isNative: false,
  });

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
