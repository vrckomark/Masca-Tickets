import { Router } from 'express';
import { createEventHandler } from '../controllers/eventController';

const router = Router();

router.post('/events', createEventHandler);

export default router;