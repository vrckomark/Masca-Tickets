// src/app.ts
import express from 'express';
import identifierRoutes from './routes/identifierRoutes';

const app = express();

// Middleware
app.use(express.json()); // Za obravnavo JSON zahtev

// Routes
app.use('/api', identifierRoutes);

export default app;