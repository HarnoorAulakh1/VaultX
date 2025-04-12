export interface networkInterface {
  token: string;
  chainId?: number;
  wallets: {
    name: string;
    address: string;
  }[];
}

export interface walletInterface {
    name: string;
    address: string;
}
