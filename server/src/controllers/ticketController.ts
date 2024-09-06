import { Request, Response } from 'express';
import { createTicket, getTicketsByWallet, getActiveTicketsByWallet } from '../services/ticketService';

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

export const getTicketsByWalletHandler = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet is required' });
    }

    const tickets = await getTicketsByWallet(wallet);
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const getActiveTicketsByWalletHandler = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet is required' });
    }

    const tickets = await getActiveTicketsByWallet(wallet);
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}