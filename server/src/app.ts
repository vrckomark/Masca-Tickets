// src/app.ts
import express from 'express';
import identifierRoutes from './routes/identifierRoutes';
import credentialRoutes from './routes/credentialRoutes';

const app = express();

// Middleware
app.use(express.json()); // Za obravnavo JSON zahtev

// Routes
app.use('/api', identifierRoutes);
app.use('/api', credentialRoutes);

export default app;