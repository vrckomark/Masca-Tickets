import { Router } from 'express';
import { createEventHandler } from '../controllers/eventController';

const router = Router();

router.post('/event', createEventHandler);

export default router;