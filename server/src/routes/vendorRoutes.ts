import { Router } from 'express';
import { createVendorHandler, getVendorHandler } from '../controllers/vendorController';

const router = Router();

router.post('/vendor', createVendorHandler);
router.get('/vendor/:wallet', getVendorHandler);

export default router;
