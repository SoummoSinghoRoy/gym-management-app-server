import { Schema, model } from 'mongoose';
import { IUserModel } from "../Types/model.types";

const userSchema= new Schema<IUserModel> ({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
})

const User = model<IUserModel>('User', userSchema);

export default User;