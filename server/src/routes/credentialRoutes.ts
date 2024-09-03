import { Router } from 'express';
import { createCredentialHandler } from '../controllers/credentialController';

const router = Router();

router.post('/credentials', createCredentialHandler);

export default router;