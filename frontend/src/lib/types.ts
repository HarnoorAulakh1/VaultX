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
