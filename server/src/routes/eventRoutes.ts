import { Router } from "express";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventsByVendorHandler,
  getEventHandler,
} from "../controllers/eventController";

const router = Router();

router.get("/event/:id", getEventHandler);
router.post("/event", createEventHandler);
router.get("/events", getAllEventsHandler);
router.get("/getEventsByVendor/:vendorWallet", getEventsByVendorHandler);

export default router;
