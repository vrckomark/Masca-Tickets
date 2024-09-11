import { agent } from '../plugins/veramoAgent';
import { Ticket, Event } from '../db/types';

export const verifyTicket = async (credential: any) => {
  try {
    const eventId = credential.credentialSubject.eventID;
    const event = await Event.findOne({ where: { id: eventId }, relations: ['vendor'] });

    if (!event) {
      throw new Error('Event not found');
    }

    const alias = event.vendor.wallet;
    const identifier = await agent.didManagerGetByAlias({ alias });
    const vendorDID = identifier.did;

    if (!identifier) {
      throw { message: 'Identifier not found' };
    }

    const result = await agent.verifyCredential({
      credential,
      verbose: true,
    });

    if (!result.verified) {
      throw { message: 'Credential verification failed' };
    }

    const ticketID = result?.verifiableCredential?.credentialSubject?.ticketID;

    if (!ticketID) {
      throw { message: 'No ticketID found in credentialSubject' };
    }

    const ticket = await Ticket.findOne({ where: { id: ticketID } });

    if (!ticket) {
      throw { verified: false, message: 'Ticket not found in database' };
    }

    if (result.verified && credential.issuer.id === vendorDID && ticket.id === ticketID) {
      console.log('Ticket is valid');
      return true;
    } else {
      console.log('Invalid ticket');
      return false;
    }
  } catch (error) {
    throw new Error('Error verifying ticket: ' + error.message);
  }
};
