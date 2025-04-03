import { createContext } from "react";

export interface userInterface {
  public_id: string;
  private_key?: string;
  password?: string;
  seed_phrase?: string;
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
  },
  dispatch: () => {},
});