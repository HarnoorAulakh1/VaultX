import { createContext } from "react";

export interface userInterface {
  public_id: string;
  private_key?: string;
  password?: string;
  seed_phrase?: string;
  network: {
    network: string;
    name: string;
    img: string;
  };
  togleNetwork?:string;
  next?: string;
}
export const userContext = createContext<{
  user: userInterface;
  dispatch: React.Dispatch<React.SetStateAction<userInterface>>;
}>({
  user: {
    public_id: "",
    private_key: "",
    password: "",
    seed_phrase:"",
    network:{
      network: "",
      name: "",
      img: "",
    },
    next:""
  },
  dispatch: () => {},
});