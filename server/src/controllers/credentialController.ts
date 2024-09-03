import { Request, Response } from 'express';
import { createVerifiableCredential } from '../services/credentialService';

export const createCredentialHandler = async (req: Request, res: Response) => {
  try {
    const { alias, subject } = req.body;

    if (!alias || !subject) {
      return res.status(400).json({ error: 'Alias and subject are required' });
    }

    const verifiableCredential = await createVerifiableCredential(alias, subject);
    res.status(201).json({ verifiableCredential });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};