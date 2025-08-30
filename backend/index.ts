import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

// Load environment variables before anything else
dotenv.config();

// Connect to Database
connectDB();

const app: Express = express();

// Init Middleware to accept JSON data
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});