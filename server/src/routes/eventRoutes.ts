import { Router } from 'express';
import { createEventHandler, getAllEventsHandler, getEventsByVendorHandler } from '../controllers/eventController';

const router = Router();

router.post('/event', createEventHandler);
router.get('/events', getAllEventsHandler);
router.get('/getEventsByVendor/:vendorWallet', getEventsByVendorHandler);

export default router;