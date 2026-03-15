import express from "express";
import { getRestaurantsByCity, createRestaurantController, updateRestaurantProfileController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/create", createRestaurantController);
router.get("/restaurants", getRestaurantsByCity);
router.put("/:restaurant_id/profile", updateRestaurantProfileController);

export default router;