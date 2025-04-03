import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    password: { type: String, required: true },
    public_id: { type: String, required: true },
    private_Key: { type: String, required: true },
  }
);

export default model("User", schema);
