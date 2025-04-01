import { Schema } from "mongoose";

export interface userInterface {
  _id?: string;
  public_id: string;
  private_Key: string;
  password: string;
}