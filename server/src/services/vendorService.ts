import { agent } from '../plugins/veramoAgent';
import { Vendor } from '../db/types';

export const createVendor = async (companyName: string, wallet: string) => {
  try {
    const identifier = await agent.didManagerCreate({ alias: wallet });

    const vendor = Vendor.create({ companyName, wallet });
    await vendor.save();

    return { identifier, vendor };
  } catch (error) {
    throw new Error('Error creating vendor: ' + error.message);
  }
};
