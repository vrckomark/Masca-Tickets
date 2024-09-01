const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { Vendor, Event, Ticket } = require("./models/models");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "masca",
  })

  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

/* POST */

app.post("/vendor", async (req, res) => {
  const vendors = await Vendor.find();
  if (vendors.some((vendor) => vendor.wallet === req.body.wallet))
    return res
      .status(409)
      .json({ message: "Vendor with this wallet already exists" });

  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    console.log("saved Vendor", JSON.stringify(req.body));
    res.status(201).json({ data: savedVendor, message: "Success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/event", async (req, res) => {
  try {
    const { name, description, availableTickets, vendorId } = req.body;

    // Preveri, če vendor obstaja
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Ustvari nov event
    const newEvent = new Event({
      name,
      description,
      availableTickets,
      vendorId,
    });

    // Shrani event v bazo
    const savedEvent = await newEvent.save();

    // Dodaj referenco na event v vendor dokumentu
    vendor.events.push(savedEvent._id);
    await vendor.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/ticket", async (req, res) => {
  try {
    const { wallet, qrCode, eventId } = req.body;

    // Preveri, če event obstaja
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ustvari nov ticket
    const newTicket = new Ticket({
      wallet,
      qrCode,
      eventId,
    });

    // Shrani ticket v bazo
    const savedTicket = await newTicket.save();

    // Dodaj referenco na ticket v event dokumentu
    event.tickets.push(savedTicket._id);
    await event.save();

    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET */

app.get("/health-check", (req, res) => {
  res.json({ status: 200, message: "Client-Server communication successful" });
});

app.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/vendor/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/vendor/:id/events", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("events");
    res.json(vendor.events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().populate(
      "vendorId",
      "companyName wallet"
    );
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "vendorId",
      "companyName wallet"
    );
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/event/:id/tickets", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("tickets");
    res.json(event.tickets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
