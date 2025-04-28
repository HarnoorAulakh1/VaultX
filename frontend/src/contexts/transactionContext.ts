import { createContext } from "react";
import { transactionInterface } from "../lib/types";

export const transactionContext = createContext<{
  transactions: transactionInterface[]|null;
  setTransactions: React.Dispatch<React.SetStateAction<transactionInterface[]|null>>;
}>({
  transactions: [],
  setTransactions: () => {},
});