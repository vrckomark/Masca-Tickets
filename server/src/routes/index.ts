import { Router } from 'express';
import vendorRoutes from './vendorRoutes';
import ticketRoutes from './ticketRoutes';
import verifyRoutes from './verifyRoutes';
import eventRoutes from './eventRoutes';

const router = Router();

router.use(vendorRoutes);
router.use(ticketRoutes);
router.use(verifyRoutes);
router.use(eventRoutes);

export default router;
