import { Schema } from "mongoose";

export interface userInterface {
  _id?: string;
  public_id: string;
  private_key: {
    encrypted_key?: Uint8Array;
    iv?: string;
    salt?: string;
  };
  password: string;
}