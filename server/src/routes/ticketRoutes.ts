import { Router } from 'express';
import { createTicketHandler } from '../controllers/ticketController';

const router = Router();

router.post('/ticket', createTicketHandler);

export default router;