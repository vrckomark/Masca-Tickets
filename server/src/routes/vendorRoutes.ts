import { Router } from 'express';
import { createVendorHandler } from '../controllers/vendorController';

const router = Router();

router.post('/vendor', createVendorHandler);

export default router;
