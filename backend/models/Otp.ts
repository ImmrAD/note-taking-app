import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the OTP document
interface IOtp extends Document {
  email: string;
  otpCode: string;
  createdAt: Date;
}

const OtpSchema: Schema<IOtp> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpCode: {
    type: String, // This will be the hashed OTP
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m', // The document will be automatically deleted after 10 minutes
  },
});

const Otp: Model<IOtp> = mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;