// src/controllers/identifierController.ts
import { Request, Response } from 'express';
import { createIdentifier } from '../services/identifierService';

export const createIdentifierHandler = async (req: Request, res: Response) => {
  try {
    const { alias } = req.body;
    const identifier = await createIdentifier(alias);
    res.status(201).json({ identifier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
