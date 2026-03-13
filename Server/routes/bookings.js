import express from "express";
import { bookTable } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/book-table
router.post("/book-table", bookTable);

export default router;