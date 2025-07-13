import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
     name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  image: {
    required: false,
    type: String
  }
});

export const usersModel = mongoose.models.users ?? mongoose.model("users",usersSchema);