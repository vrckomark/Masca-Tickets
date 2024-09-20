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

export type TicketType = TicketReturnType & {
  isUsed: boolean;
};

export type TicketVCType = {
  "@context": string[];
  credentialSubject: TicketType;
  issuanceDate: string;
  issuer: {
    id: string;
  };
  proof: object;
  type: string[];
};
