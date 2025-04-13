import { useState } from "react";
import { userContext } from "./user";
import { userInterface } from "./user";

export default function Profile({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useState<userInterface>({
    public_id: "",
    private_key: "",
    password: "",
    seed_phrase: "",
    network:{
      network: "",
      img:"",
      name:"",
    },
    next:"",
  });

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
