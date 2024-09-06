import { Router } from 'express';
import { createTicketHandler, getTicketsByWalletHandler, getActiveTicketsByWalletHandler } from '../controllers/ticketController';

const router = Router();

router.post('/ticket', createTicketHandler);
router.get('/getTicketsByWallet/:wallet', getTicketsByWalletHandler);
router.get('/getActiveTicketsByWallet/:wallet', getActiveTicketsByWalletHandler);

export default router;