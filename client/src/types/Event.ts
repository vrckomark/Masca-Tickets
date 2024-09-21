import { Address } from "viem";

export type VendorType = {
  id: string;
  companyName: string;
  wallet: Address;
};

export type EventReturnType = {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  availableTickets: number;
  vendor: VendorType;
};

export type EventType = Omit<EventReturnType, "dateTime"> & {
  date: Date;
};
