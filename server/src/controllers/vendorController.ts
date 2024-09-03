import { Request, Response } from 'express';
import { createVendor } from '../services/vendorService';

export const createVendorHandler = async (req: Request, res: Response) => {
  try {
    const { companyName, wallet } = req.body;

    const { identifier, vendor } = await createVendor(companyName, wallet);

    res.status(201).json({ identifier, vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
