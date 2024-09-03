import { Vendor, Event } from '../db/types';

export const createEvent = async (
  wallet: string,
  name: string,
  description: string,
  dateTime: Date,
  location: string,
  availableTickets: number
) => {
  try {
    const vendor = await Vendor.findOneBy({ wallet });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    const event = Event.create({
      name,
      description,
      dateTime,
      location,
      availableTickets,
      vendor,
    });

    await event.save();

    return event;
  } catch (error) {
    throw new Error('Error creating event: ' + error.message);
  }
};