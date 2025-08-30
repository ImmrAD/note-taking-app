import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  googleId?: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;