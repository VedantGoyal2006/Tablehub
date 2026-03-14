import express from "express";
import { bookTable, checkBookingStatus, cancelBookingController, getUserBookingsController } from "../controllers/bookingController.js";

const router = express.Router();


router.post("/bookings", bookTable);
router.get("/booking-status/:booking_id", checkBookingStatus);
router.delete("/cancel-booking/:booking_id", cancelBookingController);
router.get("/user-bookings/:user_id", getUserBookingsController);

export default router;