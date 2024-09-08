import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes);

export default app;