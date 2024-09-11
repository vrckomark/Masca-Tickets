import express from 'express';
import { verifyTicketHandler, useTicketHandler } from '../controllers/verifyController';

const router = express.Router();

router.post('/verify-credential', verifyTicketHandler);
router.post('/useTicket', useTicketHandler);

export default router;