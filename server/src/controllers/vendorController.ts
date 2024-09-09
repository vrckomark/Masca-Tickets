import { Request, Response } from 'express';
import { createVendor, findVendorByWallet } from '../services/vendorService';

export const createVendorHandler = async (req: Request, res: Response) => {
  try {
    const { companyName, wallet } = req.body;

    const { identifier, vendor } = await createVendor(companyName, wallet);

    res.status(201).json({ identifier, vendor });
  } catch (error) {
      if (error.message.includes("already exists")) {
        res.status(409).json({ error: "Vendor with this wallet already exists" });
      } else {
        res.status(500).json({ error: error.message });
      }
  }
};

export const getVendorHandler = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.params;

    const vendor = await findVendorByWallet(wallet);

    if (vendor) {
      return res.status(200).json({ exists: true });
    }

    return res.status(404).json({ exists: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};