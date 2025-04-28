import { useEffect, useState ,useContext} from "react";
import { transactionContext } from "./transactionContext";
import { transactionInterface } from "../lib/types";
import { userContext } from "./user";
import { api } from "../lib/utils";
import { chainId } from "../lib/config";

export default function Transaction({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<transactionInterface[]|null>(null);
    const { user } = useContext(userContext);
   useEffect(() => {
      async function handle() {
        if (!user.public_id || !user.network.network) return;
        try {
          const response = await api.get(
            `user/transaction?chainId=${
              chainId[user.network.network.toLowerCase() as keyof typeof chainId]
            }&public_id=${user.public_id}`
          );
          console.log(response.data.transactions);
          if (response.status === 200) {
            const sorted = response.data.transactions
              .filter((x: transactionInterface) => x != null)
              .sort(
                (a: transactionInterface, b: transactionInterface) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
            setTransactions(
              sorted.filter((x: transactionInterface) => x != null)
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
      handle();
    }, [user.public_id, user.network.network]);
  return (
    <transactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </transactionContext.Provider>
  );
}
