import express from "express";
import { getRestaurantsByCity } from "../controllers/restaurantController.js";

const router = express.Router();

// GET /api/restaurants?city=Delhi
router.get("/restaurants", getRestaurantsByCity);

export default router;