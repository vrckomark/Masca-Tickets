import { Request, Response } from 'express';
import { verifyTicket } from '../services/verifyService';

export const verifyTicketHandler = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ result: false });
    }

    const result = await verifyTicket(credential);

    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error verifying ticket:', error.message);
    return res.status(200).json({ result: false });
  }
};
