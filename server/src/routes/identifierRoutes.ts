import { Router } from 'express';
import { createIdentifierHandler } from '../controllers/identifierController';

const router = Router();

router.post('/identifiers', createIdentifierHandler);

export default router;