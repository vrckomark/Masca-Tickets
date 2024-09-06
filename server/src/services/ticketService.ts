import { agent } from '../plugins/veramoAgent';
import { Event, Ticket } from '../db/types';

export const createTicket = async (eventId: string, wallet: string, alias: string, did: string) => {
  try {
    // Create Ticket in db
    const event = await Event.findOne({ where: { id: eventId } });

    if (!event) {
      throw new Error('Event not found');
    }

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
        },
        type: ['TicketVerifiableCredential'],
      },
      proofFormat: 'jwt',
    });

    return verifiableCredential;
  } catch (error) {
    throw new Error('Error creating ticket: ' + error.message);
  }
};