import express from "express";
import { bookTable } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/book-table
router.post("/bookings", bookTable);

export default router;