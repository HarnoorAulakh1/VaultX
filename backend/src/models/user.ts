import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    staffId: { type: String },
    roll_no: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true},
    age: { type: String },
    mobile_no: { type: String, required: true },
    dob: { type: Date },
    email: { type: String, unique: true, lowercase: true },
    addr: { type: String},
    department: { type: String },
    room_no: { type: String },
    hostel: { type: String },
    year: { type: String },
    prescription: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prescription",
      },
    ],
  },
  { timestamps: true }
);

export default model("User", schema);
