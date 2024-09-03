import { Request, Response } from 'express';
import { verifyCredential } from '../services/verifyService';

export const verifyCredentialHandler = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Credential is required' });
    }

    const result = await verifyCredential(credential);

    return res.status(200).json({
      verified: result.verified,
      jwt: result.jwt
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
