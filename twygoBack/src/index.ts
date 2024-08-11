// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import courseRoutes from './routes/courseRoutes';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',  // mudar em prod
}));

app.use(express.json());

app.use('/api', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

connectDB();

export default app;
