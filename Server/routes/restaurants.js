import express from "express";
import { getRestaurantsByCity,createRestaurantController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/create", createRestaurantController);
router.get("/restaurants", getRestaurantsByCity);

export default router;