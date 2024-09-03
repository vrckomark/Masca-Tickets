import express from 'express';
import { verifyCredentialHandler } from '../controllers/verifyController';

const router = express.Router();

router.post('/verify-credential', verifyCredentialHandler);

export default router;