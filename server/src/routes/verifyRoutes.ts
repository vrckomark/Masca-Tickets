import express from 'express';
import { verifyTicketHandler } from '../controllers/verifyController';

const router = express.Router();

router.post('/verify-credential', verifyTicketHandler);

export default router;