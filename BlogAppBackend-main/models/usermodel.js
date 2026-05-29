import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    profileImageUrl: String,
    role: {
      type: String,
      enum: ["AUTHOR", "USER", "ADMIN"],
    },
    isACTIVE: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const UserTypeModel = model("users", userSchema);
