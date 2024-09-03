import { Router } from 'express';
import vendorRoutes from './vendorRoutes';
import credentialRoutes from './credentialRoutes';
import verifyRoutes from './verifyRoutes';
import eventRoutes from './eventRoutes';

const router = Router();

router.use(vendorRoutes);
router.use(credentialRoutes);
router.use(verifyRoutes);
router.use(eventRoutes);

export default router;
