import { useState } from "react";
import { userContext } from "./user";
import { userInterface } from "./user";

export default function Profile({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useState<userInterface>({
    public_id: "",
    private_key: "",
    password: "",
    network:{
      name: "",
      img:"",
    },
  });

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
