// src/app.ts
import express from 'express';
import identifierRoutes from './routes/identifierRoutes';
import credentialRoutes from './routes/credentialRoutes';
import verifyRoutes from './routes/verifyRoutes';

const app = express();


app.use(express.json());

app.use('/api', identifierRoutes);
app.use('/api', credentialRoutes);
app.use('/api', verifyRoutes);

export default app;