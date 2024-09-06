import { Request, Response } from 'express';
import { createTicket } from '../services/ticketService';

export const createTicketHandler = async (req: Request, res: Response) => {
  try {
    const { eventId, wallet, alias, did } = req.body;

    if (!eventId || !wallet || !alias || !did) {
      return res.status(400).json({ error: 'Missing required fields: eventId, wallet, alias, or did' });
    }

    const verifiableCredential = await createTicket(eventId, wallet, alias, did);
    
    res.status(201).json({ verifiableCredential });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};