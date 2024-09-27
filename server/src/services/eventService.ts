import { Vendor, Event } from "../db/types";

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
      throw new Error("Vendor not found");
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
    throw new Error("Error creating event: " + error.message);
  }
};

export const getAllEvents = async () => {
  try {
    const events = await Event.find({ relations: ["vendor"] });
    return events;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};

export const getEventsByVendor = async (vendorWallet: string) => {
  try {
    const events = await Event.find({
      where: { vendor: { wallet: vendorWallet } },
      relations: ["vendor"],
    });
    return events;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await Event.findOneBy({ id });
    return event;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};
