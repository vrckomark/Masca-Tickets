const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Ticket Schema
const TicketSchema = new Schema({
  wallet: { type: String, required: true },
  vcId: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
});

// Event Schema
const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  availableTickets: { type: Number, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

// Vendor Schema
const VendorSchema = new Schema({
  companyName: { type: String, required: true },
  wallet: { type: String, required: true },
  did: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

// Models
const Vendor = mongoose.model("Vendor", VendorSchema);
const Event = mongoose.model("Event", EventSchema);
const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = { Vendor, Event, Ticket };
