import { EventType } from "./Event";

export type TicketReturnType = {
  eventDate: string;
  eventID: string;
  eventLocation: string;
  eventName: string;
  id: string;
  ticketID: string;
  isUsed: boolean;
  type: string;
};

export type TicketType = {
  id: string;
  event: EventType;
  ticketId: string;
  isUsed: boolean;
};

export type CredentialType = {
  "@context": string[];
  credentialSubject: TicketReturnType;
  issuanceDate: string;
  issuer: {
    id: string;
  };
  proof: object;
  type: string[];
};
