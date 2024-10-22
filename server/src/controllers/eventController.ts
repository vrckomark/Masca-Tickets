import { Request, Response } from "express";
import {
  createEvent,
  getAllEvents,
  getEventsByVendor,
  getEventById,
} from "../services/eventService";

export const createEventHandler = async (req: Request, res: Response) => {
  try {
    const { wallet, name, description, dateTime, location, availableTickets } =
      req.body;

    const event = await createEvent(
      wallet,
      name,
      description,
      new Date(dateTime),
      location,
      availableTickets
    );

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventHandler = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const events = await getEventById(req.params.id);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllEventsHandler = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEventsByVendorHandler = async (req: Request, res: Response) => {
  try {
    const { vendorWallet } = req.params;

    if (!vendorWallet) {
      return res.status(400).json({ error: "Vendor wallet is required" });
    }

    const events = await getEventsByVendor(vendorWallet);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
