import { Router } from 'express';
import vendorRoutes from './vendorRoutes';
import credentialRoutes from './credentialRoutes';
import verifyRoutes from './verifyRoutes';

const router = Router();

router.use(vendorRoutes);
router.use(credentialRoutes);
router.use(verifyRoutes);

export default router;