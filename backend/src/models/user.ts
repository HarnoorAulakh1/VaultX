import { model, Schema } from "mongoose";

const schema = new Schema({
  password: { type: String, required: true },
  public_id: { type: String, required: true },
  network: {
    type: String,
    required: true,
  },
  private_key: {
    encrypted_key: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
});

export default model("User", schema);
