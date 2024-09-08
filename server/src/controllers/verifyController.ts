import { Request, Response } from 'express';
import { verifyTicket } from '../services/verifyService';

export const verifyTicketHandler = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Credential is required' });
    }

    const result = await verifyTicket(credential);

    return res.status(200).json({result});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
