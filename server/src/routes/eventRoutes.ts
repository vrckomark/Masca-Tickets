import { Router } from 'express';
import { createEventHandler, getAllEventsHandler } from '../controllers/eventController';

const router = Router();

router.post('/event', createEventHandler);
router.get('/events', getAllEventsHandler);

export default router;