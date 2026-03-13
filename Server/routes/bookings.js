import express from "express";
import { bookTable, checkBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/book-table
router.post("/bookings", bookTable);
router.get("/booking-status/:booking_id", checkBookingStatus);

export default router;