import { Request, Response } from "express";
import { verifyTicket, useTicket } from "../services/verifyService";
import { io } from "../index";

export const verifyTicketHandler = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ result: false });
    }

    const result = await verifyTicket(credential);

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error verifying ticket:", error.message);
    return res.status(200).json({ result: false });
  }
};

export const useTicketHandler = async (req: Request, res: Response) => {
  try {
    const { ticketID } = req.body;

    if (!ticketID) {
      return res
        .status(400)
        .json({ result: false, message: "Ticket ID is required" });
    }

    const ticket = await useTicket(ticketID);

    console.log("QR scanned ticket: ", ticket.isUsed);

    io.to("1234").emit('ticketValidated', {
      success: true,
      message: 'Ticket has been successfully validated!',
      ticketID: ticket.id
    });

    return res.status(200).json({ result: true, ticket });
  } catch (error) {
    io.to("1234").emit('ticketValidated', {
      success: false,  // This indicates failure
      message: error.message, // Pass the error message to the vendor
    });
    return res.status(500).json({ result: false, message: error.message });
  }
};
