import { useContext, useEffect, useState } from "react";
import { api } from "../lib/utils";
import { userContext } from "../contexts/user";
import { chainId } from "../lib/config";
import { tokens } from "../lib/config";
import { transactionInterface } from "../lib/types";
import Loader from "react-js-loader";

export default function History() {
  const [transactions, setTransactions] = useState<transactionInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);
  useEffect(() => {
    async function handle() {
      setLoading(false);
      if (!user.public_id || !user.network.network) return;
      try {
        const response = await api.get(
          `user/transaction?chainId=${
            chainId[user.network.network.toLowerCase() as keyof typeof chainId]
          }&public_id=${user.public_id}`
        );
       // console.log(response.data.transactions);
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
      setLoading(true);
    }
    handle();
  }, [user.public_id, user.network.network]);
  return (
    <div className=" text-white flex flex-col gap-2 w-full h-full  p-4 overflow-scroll">
      {loading ? (
        transactions.length != 0 &&
        transactions.map((transaction, index) => (
          <Tab
            key={index}
            hash={transaction.hash}
            from={transaction.from}
            to={transaction.to}
            amount={transaction.amount}
            date={transaction.date}
            status={transaction.status}
            contractAddress={transaction.contractAddress}
          />
        ))
      ) : (
        <div className="flex justify-center w-full h-full rounded-2xl bg-[#0e0f14] z-[999] items-center text-white text-3xl">
          <Loader
            type="ping-cube"
            color="#ffffff"
            title={"VaultX"}
            size={100}
          />
        </div>
      )}
    </div>
  );
}

function Tab({
  hash,
  from,
  to,
  amount,
  date,
  status,
  contractAddress,
}: {
  hash: string;
  from: string;
  to: string;
  amount: string;
  date: string;
  status: string;
  contractAddress: string;
}) {
  console.log(date);
  console.log(hash);
  console.log(status);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    img: "",
    address: "",
  });
  const { user } = useContext(userContext);
  useEffect(() => {
    const find = tokens[
      chainId[
        user.network.network.toLowerCase() as keyof typeof chainId
      ] as keyof typeof tokens
    ].find((x) => x.contractAddress == contractAddress);

    // console.log(contractAddress, find);

    console.log("");
    if (find) {
      setToken({
        name: find.name,
        symbol: find.symbol,
        img: find.img,
        address: from.toLowerCase() == user.public_id.toLowerCase() ? to : from,
      });
    }
  }, [to, from, user.network.network, user.public_id, contractAddress]);
  function selectTransaction(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("transaction");
  }
  return (
    <div
      className={`bg-[#202126] z-0 relative hover:bg-[#141418] flex flex-row items-center gap-[1rem] px-2 py-1 w-full rounded-lg`}
    >
      <div
        onClick={(e) => selectTransaction(e)}
        className="absolute h-full w-full z-0"
      ></div>
      <div className="flex items-center">
        <img src={token.img} alt="" height={30} width={30} />
      </div>
      <div className="flex relative flex-row gap-2 justify-between w-full flex-start">
        <div
          onClick={(e) => selectTransaction(e)}
          className="absolute h-full w-full z-0"
        ></div>
        <div className="flex flex-col ">
          <h1 className="text-lg">
            {from.toLowerCase() == user.public_id.toLowerCase()
              ? "Sent"
              : "Recieved"}
          </h1>
          <h1 className="text-[#969fb0]">
            {parseFloat(amount).toPrecision(3)}
          </h1>
        </div>

        <div className="flex flex-row justify-between items-center z-[999]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 19.0251C2.45 19.0251 1.97933 18.8294 1.588 18.4381C1.196 18.0461 1 17.5751 1 17.0251V15.0251C1 14.7418 1.096 14.5041 1.288 14.3121C1.47933 14.1208 1.71667 14.0251 2 14.0251C2.28333 14.0251 2.521 14.1208 2.713 14.3121C2.90433 14.5041 3 14.7418 3 15.0251V17.0251H21V15.0251C21 14.7418 21.096 14.5041 21.288 14.3121C21.4793 14.1208 21.7167 14.0251 22 14.0251C22.2833 14.0251 22.5207 14.1208 22.712 14.3121C22.904 14.5041 23 14.7418 23 15.0251V17.0251C23 17.5751 22.8043 18.0461 22.413 18.4381C22.021 18.8294 21.55 19.0251 21 19.0251H3ZM7.35 15.2251C6.53333 15.2251 5.89167 15.0124 5.425 14.5871C4.95833 14.1624 4.725 13.5834 4.725 12.8501C4.725 12.1501 4.996 11.5791 5.538 11.1371C6.07933 10.6958 6.775 10.4751 7.625 10.4751C8.00833 10.4751 8.36267 10.5041 8.688 10.5621C9.01267 10.6208 9.29167 10.7168 9.525 10.8501V10.5001C9.525 10.0501 9.37067 9.69176 9.062 9.4251C8.754 9.15843 8.33333 9.0251 7.8 9.0251C7.55 9.0251 7.31267 9.06243 7.088 9.1371C6.86267 9.21243 6.65833 9.31676 6.475 9.4501C6.325 9.56676 6.16267 9.63343 5.988 9.6501C5.81267 9.66676 5.65 9.61676 5.5 9.5001C5.35 9.38343 5.25833 9.23743 5.225 9.0621C5.19167 8.88743 5.24167 8.73343 5.375 8.6001C5.675 8.31676 6.02933 8.1001 6.438 7.9501C6.846 7.8001 7.30833 7.7251 7.825 7.7251C8.85833 7.7251 9.65 7.97076 10.2 8.4621C10.75 8.9541 11.025 9.66676 11.025 10.6001V14.2751C11.025 14.4751 10.954 14.6458 10.812 14.7871C10.6707 14.9291 10.5 15.0001 10.3 15.0001C10.0833 15.0001 9.90433 14.9291 9.763 14.7871C9.621 14.6458 9.55 14.4668 9.55 14.2501V14.1501H9.475C9.25833 14.4834 8.96667 14.7461 8.6 14.9381C8.23333 15.1294 7.81667 15.2251 7.35 15.2251ZM7.9 11.6501C7.36667 11.6501 6.95833 11.7541 6.675 11.9621C6.39167 12.1708 6.25 12.4668 6.25 12.8501C6.25 13.1834 6.375 13.4541 6.625 13.6621C6.875 13.8708 7.2 13.9751 7.6 13.9751C8.13333 13.9751 8.58767 13.7874 8.963 13.4121C9.33767 13.0374 9.525 12.5834 9.525 12.0501C9.29167 11.9168 9.025 11.8168 8.725 11.7501C8.425 11.6834 8.15 11.6501 7.9 11.6501ZM16.325 15.2251C15.6417 15.2251 15.121 15.0751 14.763 14.7751C14.4043 14.4751 14.175 14.2418 14.075 14.0751H14V14.4001C14 14.6001 13.9293 14.7708 13.788 14.9121C13.646 15.0541 13.475 15.1251 13.275 15.1251C13.075 15.1251 12.9 15.0501 12.75 14.9001C12.6 14.7501 12.525 14.5751 12.525 14.3751V5.7501C12.525 5.53343 12.6 5.3501 12.75 5.2001C12.9 5.0501 13.0833 4.9751 13.3 4.9751C13.5167 4.9751 13.7 5.0501 13.85 5.2001C14 5.3501 14.075 5.53343 14.075 5.7501V7.8001L14 8.8001H14.075C14.125 8.71676 14.325 8.5041 14.675 8.1621C15.025 7.82076 15.575 7.6501 16.325 7.6501C17.3917 7.6501 18.2333 8.03343 18.85 8.8001C19.4667 9.56676 19.775 10.4501 19.775 11.4501C19.775 12.4501 19.471 13.3291 18.863 14.0871C18.2543 14.8458 17.4083 15.2251 16.325 15.2251ZM16.1 9.0501C15.4333 9.0501 14.9167 9.29576 14.55 9.7871C14.1833 10.2791 14 10.8251 14 11.4251C14 12.0418 14.1833 12.5918 14.55 13.0751C14.9167 13.5584 15.4333 13.8001 16.1 13.8001C16.7667 13.8001 17.2877 13.5584 17.663 13.0751C18.0377 12.5918 18.225 12.0418 18.225 11.4251C18.225 10.8084 18.0377 10.2584 17.663 9.7751C17.2877 9.29176 16.7667 9.0501 16.1 9.0501Z"
              fill="rgba(117, 121, 138, 1)"
            ></path>
          </svg>
          <div className="flex flex-row gap-2 text-[#969fb0] items-center ">
            <div className="rounded-md text-sm">
              {token.address?.substring(0, 6)}...
              {token.address?.substring(token.address.length - 4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
