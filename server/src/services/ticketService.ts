import { agent } from '../plugins/veramoAgent';
import { Event, Ticket } from '../db/types';

export const createTicket = async (eventId: string, wallet: string, alias: string, did: string) => {
  try {
    // Create Ticket in db
    const event = await Event.findOne({ where: { id: eventId } });

    if (!event) {
      throw new Error('Event not found');
    }

    if (event.availableTickets <= 0) {
      throw new Error('No available tickets for this event');
    }

    event.availableTickets -= 1;

    await event.save();

    const ticket = Ticket.create({
      wallet: wallet,
      isUsed: false,
      event,
    });

    await ticket.save();

    // Create VC
    const identifier = await agent.didManagerGetByAlias({ alias });

    if (!identifier) {
      throw new Error(`Identifier with alias ${alias} not found`);
    }

    const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject: {
          id: did,
          ticketID: ticket.id,
          eventName: event.name,
          eventLocation: event.location,
          eventDate: event.dateTime,
          eventID: event.id,
        },
        type: [event.name],
      },
      proofFormat: 'jwt',
    });

    return verifiableCredential;
  } catch (error) {
    throw new Error('Error creating ticket: ' + error.message);
  }
};

export const getTicketsByWallet = async (wallet: string) => {
  try {
    const tickets = await Ticket.find({
      where: { wallet },
      relations: ['event'],
    });

    return tickets;
  } catch (error) {
    throw new Error('Error fetching tickets: ' + error.message);
  }
};

export const getActiveTicketsByWallet = async (wallet: string) => {
  try {
    const tickets = await Ticket.find({
      where: { wallet, isUsed: false },
      relations: ['event'],
    });

    return tickets;
  } catch (error) {
    throw new Error('Error fetching tickets: ' + error.message);
  }
};