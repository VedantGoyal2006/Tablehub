import express from "express";
import { getRestaurantsByCity, createRestaurantController, updateRestaurantProfileController, getRestaurantBookingsController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/create", createRestaurantController);
router.get("/restaurants", getRestaurantsByCity);
router.put("/:restaurant_id/profile", updateRestaurantProfileController);
router.get("/:restaurant_id/bookings", getRestaurantBookingsController);

export default router;