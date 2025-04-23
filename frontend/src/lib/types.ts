export interface networkInterface {
  network: string;
  wallets: {
    name: string;
    public_id: string;
  }[];
}

export interface walletInterface {
    name: string;
    network: string;
    public_id: string;
}

export interface tokenInterface {
  chainId?: string;
  contractAddress?: string | null;
  name: string;
  symbol: string;
  decimals: number;
  img: string;
  coingeckoId: string;
  isNative?: boolean;
}