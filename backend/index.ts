// index.ts
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Import cors
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

dotenv.config();
connectDB();

const app: Express = express();

// --- CORS Configuration ---
const corsOptions = {
  origin: 'https://note-taking-app-seven-nu.vercel.app', // <-- Your Vercel URL
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions)); // <-- Use cors middleware

app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});