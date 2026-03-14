import express from "express";
import { bookTable, checkBookingStatus, cancelBookingController } from "../controllers/bookingController.js";

const router = express.Router();


router.post("/bookings", bookTable);
router.get("/booking-status/:booking_id", checkBookingStatus);
router.delete("/cancel-booking/:booking_id", cancelBookingController);

export default router;