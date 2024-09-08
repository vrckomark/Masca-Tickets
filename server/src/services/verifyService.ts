import { agent } from '../plugins/veramoAgent';
import { Ticket } from '../db/types';

export const verifyTicket = async (credential: any) => {
  try {
    const result = await agent.verifyCredential({
      credential,
      verbose: true,
    });

    if (!result.verified) {
      throw { verified: false, message: 'Credential verification failed' };
    }

    const ticketID = result?.verifiableCredential?.credentialSubject?.ticketID;

    if (!ticketID) {
      throw { verified: false, message: 'No ticketID found in credentialSubject' };
    }

    const ticket = await Ticket.findOne({ where: { id: ticketID } });

    if (!ticket) {
      throw { verified: false, message: 'Ticket not found' };
    }

    if (ticket.isUsed) {
      throw { verified: false, message: 'Ticket has already been used' };
    }

    ticket.isUsed = true;
    await ticket.save();

    return { verified: true, message: 'Credential verified and ticket marked as used' };
  } catch (error) {
    throw new Error('Error verifying ticket: ' + error.message);
  }
};
