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


export interface transactionInterface {
  hash: string;
  from: string;
  to: string;
  gasUsed: string;
  gasPrice: string;
  blockNumber:string,
  amount: string;
  date: string;
  status: string;
  contractAddress: string;
}