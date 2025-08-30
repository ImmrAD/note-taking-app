import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Otp from '../models/Otp';

const router: Router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @route   POST /api/auth/signup/email
 * @desc    Send OTP to user's email for verification
 */
router.post('/signup/email', async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // 2. Generate and hash OTP
    const otpCode: string = Math.floor(100000 + Math.random() * 900000).toString();
    const salt: string = await bcrypt.genSalt(10);
    const hashedOtp: string = await bcrypt.hash(otpCode, salt);

    // 3. Save OTP to database
    await Otp.create({ email, otpCode: hashedOtp });

    // 4. Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your OTP for signup is: ${otpCode}. It is valid for 10 minutes.`,
    });

    return res.status(200).json({ msg: 'OTP sent to your email successfully.' });

  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/auth/verify/otp
 * @desc    Verify OTP, create user, and return JWT
 */
router.post('/verify/otp', async (req: Request, res: Response): Promise<Response | void> => {
  const { email, otp } = req.body;

  try {
    // 1. Find the OTP record for the email
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ msg: 'OTP has expired or is invalid.' });
    }

    // 2. Compare the submitted OTP with the hashed one
    const isMatch: boolean = await bcrypt.compare(otp, otpRecord.otpCode);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid OTP.' });
    }

    // 3. Create the new user
    const newUser = new User({ email });
    await newUser.save();

    // 4. Create JWT Payload
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    // 5. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '5h' },
      (err: Error | null, token: string | undefined) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    // 6. Delete the used OTP
    await Otp.deleteOne({ email });

  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

export default router;